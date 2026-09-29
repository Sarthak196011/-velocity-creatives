import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET || 'velocity_admin_2026';
    const { searchParams } = new URL(req.url);
    const providedKey = searchParams.get('key');
    const authHeader = req.headers.get('authorization');

    // Strict Authorization Check to protect client PII
    const isAuthorized = 
      providedKey === adminSecret || 
      authHeader === `Bearer ${adminSecret}`;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authorization required to export client records.' },
        { status: 401 }
      );
    }

    const filePath = path.join(process.cwd(), 'data', 'leads_and_meetings.xlsx');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'No bookings file found on server.' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="velocity_creatives_meetings.xlsx"',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Could not download Excel file.' },
      { status: 500 }
    );
  }
}
