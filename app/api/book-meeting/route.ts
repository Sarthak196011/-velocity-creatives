import { NextRequest, NextResponse } from 'next/server';
import { generateZoomMeeting } from '@/lib/zoomService';
import { saveBookingToExcel, BookingRecord, getBookedSlots, isSlotAlreadyBooked } from '@/lib/excelService';
import { sendWelcomeEmail } from '@/lib/emailService';
import { checkRateLimit, validateBookingInput } from '@/lib/security';

// GET: Return all currently booked slots so UI can disable them
export async function GET() {
  try {
    const bookedSlots = getBookedSlots();
    return NextResponse.json(
      { bookedSlots },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ bookedSlots: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (Defense against DoS & email flooding)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = (forwarded ? forwarded.split(',')[0].trim() : null) || 
               req.headers.get('x-real-ip') || 
               '127.0.0.1';

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000); // 5 bookings per 10 mins per IP
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: `Too many booking attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
        }
      );
    }

    // 2. Body parsing and size check
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 });
    }

    // 3. Strict Input Validation & Formula Injection Sanitization
    const validation = validateBookingInput(body);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { error: validation.error || 'Invalid booking details provided.' },
        { status: 400 }
      );
    }

    const { name, phone, email, brandUrl, creativeNeed, date, time } = validation.sanitized;

    // 4. Double-Booking Prevention Check
    if (isSlotAlreadyBooked(date, time)) {
      return NextResponse.json(
        { 
          error: `The ${time} time slot on ${date} is already booked. Please choose another date or time on the calendar.`,
          code: 'SLOT_UNAVAILABLE'
        },
        { status: 409 }
      );
    }

    // Generate unique booking reference
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `VC-${yearMonth}-${randomSuffix}`;

    // Timestamp in IST
    const createdAt = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    // 5. Generate Zoom Meeting Link & Room Credentials
    const zoomDetails = await generateZoomMeeting({
      clientName: name,
      date,
      time,
    });

    // 6. Prepare sanitized booking record
    const record: BookingRecord = {
      bookingId,
      createdAt,
      name,
      phone,
      email,
      brandUrl,
      creativeNeed,
      date,
      time,
      zoomLink: zoomDetails.joinUrl,
      zoomMeetingId: zoomDetails.formattedMeetingId,
      zoomPasscode: zoomDetails.passcode,
      status: 'Confirmed',
    };

    // 7. Store in Excel spreadsheet (.xlsx) & CSV with formula sanitization
    const excelResult = await saveBookingToExcel(record);

    // 8. Dispatch Automated Welcome Email with Zoom details
    const emailResult = await sendWelcomeEmail(record);

    return NextResponse.json({
      success: true,
      bookingId,
      createdAt,
      client: {
        name: record.name,
        phone: record.phone,
        email: record.email,
        brandUrl: record.brandUrl,
        creativeNeed: record.creativeNeed,
        date: record.date,
        time: record.time,
      },
      zoom: {
        joinUrl: zoomDetails.joinUrl,
        meetingId: zoomDetails.formattedMeetingId,
        passcode: zoomDetails.passcode,
      },
      email: {
        status: emailResult.success ? 'sent' : 'failed',
      },
    });
  } catch (error: any) {
    console.error('Secure booking error:', error);
    return NextResponse.json(
      { error: 'An error occurred while booking your meeting. Please try again.' },
      { status: 500 }
    );
  }
}
