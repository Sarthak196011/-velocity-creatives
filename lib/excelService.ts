import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

export interface BookingRecord {
  bookingId: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  brandUrl: string;
  creativeNeed: string;
  date: string;
  time: string;
  zoomLink: string;
  zoomMeetingId: string;
  zoomPasscode: string;
  status: string;
}

const COLUMNS = [
  { header: 'Booking ID', key: 'bookingId', width: 18 },
  { header: 'Created At (IST)', key: 'createdAt', width: 22 },
  { header: 'Client Name', key: 'name', width: 22 },
  { header: 'Phone / WhatsApp', key: 'phone', width: 20 },
  { header: 'Email Address', key: 'email', width: 28 },
  { header: 'Brand / Instagram', key: 'brandUrl', width: 26 },
  { header: 'Creative Need', key: 'creativeNeed', width: 34 },
  { header: 'Scheduled Date', key: 'date', width: 20 },
  { header: 'Scheduled Time', key: 'time', width: 16 },
  { header: 'Zoom Meeting Link', key: 'zoomLink', width: 44 },
  { header: 'Zoom Meeting ID', key: 'zoomMeetingId', width: 18 },
  { header: 'Zoom Passcode', key: 'zoomPasscode', width: 16 },
  { header: 'Status', key: 'status', width: 16 },
];

function applyHeaderStyle(headerRow: ExcelJS.Row) {
  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E1B4B' }, // Dark Indigo
    };
    cell.font = {
      name: 'Calibri',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: false,
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF312E81' } },
      left: { style: 'thin', color: { argb: 'FF312E81' } },
      bottom: { style: 'medium', color: { argb: 'FF7C3AED' } },
      right: { style: 'thin', color: { argb: 'FF312E81' } },
    };
  });
}

function applyDataRowStyle(row: ExcelJS.Row, record: BookingRecord, isEven: boolean) {
  row.height = 24;
  row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    cell.font = {
      name: 'Calibri',
      size: 10,
      color: { argb: 'FF111827' },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: [1, 2, 8, 9, 11, 12, 13].includes(colNumber) ? 'center' : 'left',
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
    };

    if (isEven) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF9FAFB' },
      };
    }

    // Zoom link styling (col 10)
    if (colNumber === 10) {
      cell.value = {
        text: record.zoomLink,
        hyperlink: record.zoomLink,
      };
      cell.font = {
        name: 'Calibri',
        size: 10,
        color: { argb: 'FF2563EB' },
        underline: true,
      };
    }

    // Status styling (col 13)
    if (colNumber === 13) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFDCFCE7' }, // Soft green
      };
      cell.font = {
        name: 'Calibri',
        size: 10,
        bold: true,
        color: { argb: 'FF15803D' }, // Deep green
      };
    }
  });
}

export async function saveBookingToExcel(record: BookingRecord): Promise<{
  success: boolean;
  projectFilePath: string;
  downloadsFilePath: string;
  totalRecords: number;
}> {
  const dataDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const projectFilePath = path.join(dataDir, 'leads_and_meetings.xlsx');
  const userHome = process.env.USERPROFILE || 'C:/Users/sarthak';
  const downloadsDir = path.join(userHome, 'Downloads');
  const downloadsFilePath = path.join(downloadsDir, 'velocity_creatives_meetings.xlsx');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Velocity Creatives Automated System';
  workbook.lastModifiedBy = 'Velocity Creatives App';
  workbook.created = new Date();
  workbook.modified = new Date();

  let worksheet: ExcelJS.Worksheet;

  if (fs.existsSync(projectFilePath)) {
    try {
      await workbook.xlsx.readFile(projectFilePath);
      worksheet = workbook.getWorksheet('Meeting Bookings & Leads') || workbook.worksheets[0];
      if (!worksheet) {
        worksheet = workbook.addWorksheet('Meeting Bookings & Leads');
        worksheet.columns = COLUMNS;
        applyHeaderStyle(worksheet.getRow(1));
      }
    } catch {
      worksheet = workbook.addWorksheet('Meeting Bookings & Leads');
      worksheet.columns = COLUMNS;
      applyHeaderStyle(worksheet.getRow(1));
    }
  } else {
    worksheet = workbook.addWorksheet('Meeting Bookings & Leads');
    worksheet.columns = COLUMNS;
    applyHeaderStyle(worksheet.getRow(1));
  }

  // Append new row using robust array ordering
  const rowValues = [
    record.bookingId,
    record.createdAt,
    record.name,
    record.phone,
    record.email,
    record.brandUrl,
    record.creativeNeed,
    record.date,
    record.time,
    record.zoomLink,
    record.zoomMeetingId,
    record.zoomPasscode,
    record.status || 'Confirmed',
  ];
  const newRow = worksheet.addRow(rowValues);

  const isEvenRow = (worksheet.rowCount % 2 === 0);
  applyDataRowStyle(newRow, record, isEvenRow);

  // Write to primary project file
  await workbook.xlsx.writeFile(projectFilePath);

  // Also copy/write to user's Downloads folder for instant access
  let finalDownloadsPath = downloadsFilePath;
  try {
    if (fs.existsSync(downloadsDir)) {
      await workbook.xlsx.writeFile(downloadsFilePath);
    }
  } catch (err: any) {
    console.warn('Primary Downloads file is locked by open Excel window:', err.message);
    // If the file is open and locked by Excel, save to a fallback live copy
    try {
      const fallbackPath = path.join(downloadsDir, 'velocity_creatives_meetings_live.xlsx');
      await workbook.xlsx.writeFile(fallbackPath);
      finalDownloadsPath = fallbackPath;
      console.log('Saved to fallback unblocked file:', fallbackPath);
    } catch (fallbackErr) {
      console.warn('Could not write fallback copy:', fallbackErr);
    }
  }

  // Append to CSV backup as well
  try {
    const csvPath = path.join(dataDir, 'leads_and_meetings.csv');
    const csvHeader = 'Booking ID,Created At,Name,Phone,Email,Brand URL,Creative Need,Date,Time,Zoom Link,Zoom ID,Passcode,Status\n';
    const csvRow = `"${record.bookingId}","${record.createdAt}","${record.name.replace(/"/g, '""')}","${record.phone}","${record.email}","${record.brandUrl.replace(/"/g, '""')}","${record.creativeNeed.replace(/"/g, '""')}","${record.date}","${record.time}","${record.zoomLink}","${record.zoomMeetingId}","${record.zoomPasscode}","${record.status}"\n`;

    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, csvHeader + csvRow, 'utf8');
    } else {
      fs.appendFileSync(csvPath, csvRow, 'utf8');
    }
  } catch (err) {
    console.warn('CSV backup error:', err);
  }

  return {
    success: true,
    projectFilePath,
    downloadsFilePath,
    totalRecords: worksheet.rowCount - 1,
  };
}


export function normalizeDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toDateString();
  } catch {}
  return (dateStr || '').trim().toLowerCase();
}

export function normalizeTime(timeStr: string): string {
  return (timeStr || '').trim().toLowerCase().replace(/^0/, '');
}

export function getBookedSlots(): Array<{ date: string; time: string; normalizedDate: string }> {
  const dataDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
  const csvPath = path.join(dataDir, 'leads_and_meetings.csv');

  if (!fs.existsSync(csvPath)) return [];

  try {
    const content = fs.readFileSync(csvPath, 'utf8').trim();
    const lines = content.split('\n');
    if (lines.length <= 1) return [];

    const bookedSlots: Array<{ date: string; time: string; normalizedDate: string }> = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g;
      const values: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        let val = match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2];
        values.push(val);
        if (regex.lastIndex === line.length) break;
      }

      const dateVal = values[7];
      const timeVal = values[8];

      if (dateVal && timeVal) {
        bookedSlots.push({
          date: dateVal.trim(),
          time: timeVal.trim(),
          normalizedDate: normalizeDate(dateVal),
        });
      }
    }

    return bookedSlots;
  } catch (err) {
    console.warn('Could not read booked slots:', err);
    return [];
  }
}

export function isSlotAlreadyBooked(targetDate: string, targetTime: string): boolean {
  const slots = getBookedSlots();
  const targetNormDate = normalizeDate(targetDate);
  const targetNormTime = normalizeTime(targetTime);

  return slots.some(slot => {
    return slot.normalizedDate === targetNormDate && normalizeTime(slot.time) === targetNormTime;
  });
}
