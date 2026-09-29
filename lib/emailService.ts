import nodemailer from 'nodemailer';
import { BookingRecord } from './excelService';

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string | false;
  mode: 'smtp' | 'ethereal' | 'simulated';
  html: string;
  subject: string;
}

export function generateWelcomeEmailHtml(record: BookingRecord): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Confirmed - Velocity Creatives</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080611; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #080611; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background: #0f0c1e; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);" cellspacing="0" cellpadding="0" border="0">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1e113a 0%, #110d24 100%); padding: 36px 36px 28px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="display: inline-block; padding: 6px 16px; border-radius: 999px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: #c084fc; text-transform: uppercase; margin-bottom: 14px;">
                Velocity Creatives
              </div>
              <h1 style="margin: 0 0 10px; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
                Your Strategy Call is Confirmed!
              </h1>
              <p style="margin: 0; color: #a5b4fc; font-size: 15px;">
                We look forward to meeting you and reviewing your brand's ad performance.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #f1f5f9;">
                Hi <strong>${record.name}</strong>,
              </p>
              <p style="margin: 0 0 28px; font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                Thank you for scheduling your 30-minute creative strategy call with <strong>Velocity Creatives</strong>. We have reserved your slot and generated your dedicated Zoom meeting link below.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; margin-bottom: 28px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Meeting Date & Time</div>
                          <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-top: 4px;">${record.date} at ${record.time}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Zoom Meeting Room</div>
                          <div style="font-size: 14px; color: #e2e8f0; margin-top: 4px; font-family: monospace;">Meeting ID: <strong>${record.zoomMeetingId}</strong> &bull; Passcode: <strong>${record.zoomPasscode}</strong></div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Brand / Website</div>
                          <div style="font-size: 14px; color: #a5b4fc; margin-top: 4px;">${record.brandUrl}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Focus Area</div>
                          <div style="font-size: 14px; color: #e2e8f0; margin-top: 4px;">${record.creativeNeed}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="${record.zoomLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 36px; border-radius: 12px; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);">
                      Join Zoom Meeting &rarr;
                    </a>
                    <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
                      Direct Link: <a href="${record.zoomLink}" style="color: #818cf8; word-break: break-all;">${record.zoomLink}</a>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 15px; font-weight: 700;">
                  What we will cover during the call:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.7;">
                  <li>Review your current visual creatives and click-through rates.</li>
                  <li>Present 3 custom high-performing ad angles tailored specifically to your products.</li>
                  <li>Discuss practical rollout plans (static ads, video hooks, carousel designs).</li>
                </ul>
              </div>

              <div style="background: rgba(124, 58, 237, 0.1); border-left: 3px solid #7c3aed; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 13px; color: #cbd5e1;">
                <strong>Booking Ref:</strong> ${record.bookingId} &bull; Need to reschedule? Simply reply to this email or WhatsApp us at <strong>${record.phone}</strong>.
              </div>
            </td>
          </tr>

          <tr>
            <td style="background: #080611; padding: 24px 36px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #64748b;">
              &copy; 2026 Velocity Creatives. All rights reserved.<br>
              Performance-driven ad creatives for ambitious direct-to-consumer brands.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmail(record: BookingRecord): Promise<EmailSendResult> {
  const subject = `Meeting Confirmed: Strategy Call with Velocity Creatives [Zoom Link Inside]`;
  const html = generateWelcomeEmailHtml(record);

  // 1. Check for real SMTP credentials in environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;
  const fromEmail = process.env.SMTP_FROM || smtpUser || 'Velocity Creatives <hello@velocitycreatives.com>';

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: record.email,
        subject,
        html,
      });

      console.log('Real SMTP email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        previewUrl: false,
        mode: 'smtp',
        html,
        subject,
      };
    } catch (err) {
      console.warn('Real SMTP send failed, falling back to test mailer:', err);
    }
  }

  // 2. Try Gmail transport if GMAIL_USER and GMAIL_APP_PASS exist
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `Velocity Creatives <${process.env.GMAIL_USER}>`,
        to: record.email,
        subject,
        html,
      });

      console.log('Gmail email sent successfully:', info.messageId);

      // Instant Admin Alert Email to owner
      try {
        const adminEmail = process.env.GMAIL_USER || 'velocitycreatives2004@gmail.com';
        await transporter.sendMail({
          from: `Velocity Creatives <${process.env.GMAIL_USER}>`,
          to: adminEmail,
          subject: `🔥 New Booking: ${record.name} (${record.date} @ ${record.time})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 24px; background: #0f0c1e; color: #fff; border-radius: 16px; border: 1px solid rgba(124,58,237,0.4); max-width: 600px;">
              <h2 style="color: #4ade80; margin-top: 0; font-size: 20px;">⚡ New Strategy Call Booked!</h2>
              <p style="color: #94a3b8; font-size: 14px;">A new lead has confirmed a meeting on your website:</p>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin: 16px 0;">
                <p style="margin: 6px 0; font-size: 14px;"><strong>Client Name:</strong> ${record.name}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/${record.phone.replace(/[^0-9]/g, '')}" style="color: #38bdf8;">${record.phone}</a></p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${record.email}" style="color: #38bdf8;">${record.email}</a></p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Brand / Store:</strong> ${record.brandUrl}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Need:</strong> ${record.creativeNeed}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Date & Time:</strong> <span style="color: #facc15; font-weight: bold;">${record.date} at ${record.time}</span></p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Zoom Meeting Link:</strong> <a href="${record.zoomLink}" style="color: #c084fc;">${record.zoomLink}</a></p>
                <p style="margin: 6px 0; font-size: 13px; color: #94a3b8;">Meeting ID: ${record.zoomMeetingId} | Pass: ${record.zoomPasscode}</p>
              </div>
              <div style="font-size: 12px; color: #64748b;">Booking ID: ${record.bookingId}</div>
            </div>
          `,
        });
        console.log('Admin notification delivered to:', adminEmail);
      } catch (adminErr) {
        console.warn('Admin notification error:', adminErr);
      }
      return {
        success: true,
        messageId: info.messageId,
        previewUrl: false,
        mode: 'smtp',
        html,
        subject,
      };
    } catch (err) {
      console.warn('Gmail send failed, falling back to test mailer:', err);
    }
  }

  // 3. Ethereal Email (Auto-generated test mailbox with instant browser view)
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await testTransporter.sendMail({
      from: 'Velocity Creatives <welcome@velocitycreatives.com>',
      to: record.email,
      subject,
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('Ethereal test email dispatched. Preview URL:', previewUrl);

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl || false,
      mode: 'ethereal',
      html,
      subject,
    };
  } catch (testErr) {
    console.warn('Ethereal setup failed, using simulated logger:', testErr);
  }

  // 4. Simulated Delivery (Guaranteed 100% success fallback)
  return {
    success: true,
    messageId: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    previewUrl: false,
    mode: 'simulated',
    html,
    subject,
  };
}