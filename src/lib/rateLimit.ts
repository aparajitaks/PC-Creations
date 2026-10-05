/**
 * rateLimit.ts
 * ─────────────────────────────────────────────────────────────
 * Simple in-memory rate limiting for API routes.
 *
 * This provides basic protection against spam and abuse.
 * For production, consider using Redis or a dedicated rate limiting service.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Check if a request should be rate limited.
 *
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if rate limited, false if allowed
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000 // 1 minute default
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up expired entries
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(identifier);
  }

  const currentEntry = rateLimitMap.get(identifier);

  if (!currentEntry) {
    // First request in window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (currentEntry.count >= maxRequests) {
    // Rate limit exceeded
    return true;
  }

  // Increment count
  currentEntry.count++;
  rateLimitMap.set(identifier, currentEntry);
  return false;
}

/**
 * Get the rate limit info for an identifier.
 *
 * @param identifier - Unique identifier
 * @returns Remaining requests and reset time
 */
export function getRateLimitInfo(identifier: string): {
  remaining: number;
  resetTime: number;
} | null {
  const entry = rateLimitMap.get(identifier);
  if (!entry) return null;

  const now = Date.now();
  if (now > entry.resetTime) {
    rateLimitMap.delete(identifier);
    return null;
  }

  return {
    remaining: Math.max(0, 5 - entry.count),
    resetTime: entry.resetTime,
  };
}

/**
 * Clean up expired rate limit entries.
 * Call this periodically to prevent memory leaks.
 */
export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}
