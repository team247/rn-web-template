import { formatDate, formatDateTime, formatTime, formatRelativeTime } from '../utils/formatDate';

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const date = '2024-01-15T10:30:00Z';
    const result = formatDate(date);
    expect(result).toMatch(/Jan(uary)?\s+15,?\s+2024/i);
  });

  it('should format Date object correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    const result = formatDate(date);
    expect(result).toMatch(/Jan(uary)?\s+15,?\s+2024/i);
  });

  it('should handle custom format', () => {
    const date = '2024-01-15T10:30:00Z';
    const result = formatDate(date, 'yyyy-MM-dd');
    expect(result).toBe('2024-01-15');
  });
});

describe('formatDateTime', () => {
  it('should include time in output', () => {
    const date = '2024-01-15T10:30:00Z';
    const result = formatDateTime(date);
    // Should contain date and time components
    expect(result).toMatch(/Jan|15|2024/i);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe('formatTime', () => {
  it('should format time correctly', () => {
    const date = '2024-01-15T14:30:00Z';
    const result = formatTime(date);
    // Should be a time format
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe('formatRelativeTime', () => {
  it('should return relative time for recent dates', () => {
    const recentDate = new Date(Date.now() - 60000); // 1 minute ago
    const result = formatRelativeTime(recentDate);
    expect(result).toMatch(/minute|min|ago|less than/i);
  });

  it('should handle dates in the future', () => {
    const futureDate = new Date(Date.now() + 3600000); // 1 hour from now
    const result = formatRelativeTime(futureDate);
    expect(result).toMatch(/hour|in|from now/i);
  });
});
