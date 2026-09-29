// In-memory rate limiting cache
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 10 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * IP Rate Limiter
 * Limits requests per client IP to prevent spam & abuse
 */
export function checkRateLimit(
  ip: string, 
  maxRequests: number = 4, 
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

/**
 * Formula Injection & CSV Injection Sanitizer (OWASP Top 10)
 * Prevents execution of dangerous formulas in Microsoft Excel or Google Sheets
 */
export function sanitizeForExcel(value: any): string {
  if (value === null || value === undefined) return '';
  let str = String(value).trim();

  // Strip ASCII control characters (0x00 to 0x1F)
  str = str.replace(/[\x00-\x1F\x7F]/g, '');

  // If the cell starts with a formula trigger character (=, +, -, @, \t, \r), prepend a single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }

  // Prevent XSS / HTML tags
  str = str.replace(/<[^>]*>?/gm, '');

  return str;
}

/**
 * Strict Input Validator for Meeting Bookings
 */
export function validateBookingInput(body: any): {
  valid: boolean;
  error?: string;
  sanitized?: {
    name: string;
    phone: string;
    email: string;
    brandUrl: string;
    creativeNeed: string;
    date: string;
    time: string;
  };
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  // 1. Honeypot check (Bots automatically fill hidden fields)
  if (body.company_website_url || body._gotcha) {
    return { valid: false, error: 'Spam detected.' };
  }

  // 2. Name validation
  const rawName = String(body.name || '').trim();
  if (!rawName || rawName.length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (rawName.length > 70) {
    return { valid: false, error: 'Name is too long (maximum 70 characters).' };
  }

  // 3. Email validation
  const rawEmail = String(body.email || '').trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(rawEmail) || rawEmail.length > 100) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  // 4. Phone number validation
  const rawPhone = String(body.phone || '').trim();
  const phoneDigits = rawPhone.replace(/\D/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { valid: false, error: 'Please enter a valid phone or WhatsApp number (8 to 15 digits).' };
  }

  // 5. Brand URL validation
  const rawBrand = String(body.brandUrl || '').trim();
  if (!rawBrand || rawBrand.length < 2) {
    return { valid: false, error: 'Please provide your store or Instagram link.' };
  }
  if (rawBrand.length > 120) {
    return { valid: false, error: 'Brand link is too long (maximum 120 characters).' };
  }

  // 6. Whitelist allowed creative need
  const allowedNeeds = [
    'Need 15+ fresh image ads',
    'Need short video ads for Reels',
    'Need educational carousels',
    'Current ads are getting tired / need new ideas',
  ];
  const creativeNeed = allowedNeeds.includes(body.creativeNeed)
    ? body.creativeNeed
    : 'Need 15+ fresh image ads';

  return {
    valid: true,
    sanitized: {
      name: sanitizeForExcel(rawName),
      phone: sanitizeForExcel(rawPhone),
      email: sanitizeForExcel(rawEmail),
      brandUrl: sanitizeForExcel(rawBrand),
      creativeNeed: sanitizeForExcel(creativeNeed),
      date: sanitizeForExcel(body.date || 'Tomorrow'),
      time: sanitizeForExcel(body.time || '2:30 PM'),
    },
  };
}
