interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

/**
 * In-memory token bucket/sliding window rate limiter
 * @param key unique identifier (e.g. client IP + route)
 * @param limit max requests allowed in window
 * @param windowMs window duration in milliseconds
 */
export function isRateLimited(key: string, limit = 5, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const record = tracker.get(key);

  if (!record || now > record.resetTime) {
    tracker.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}
