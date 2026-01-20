import {
  format,
  formatDistanceToNow,
  parseISO,
  isValid,
  differenceInDays,
} from 'date-fns';

/**
 * Format a date string or Date object to a human-readable format
 */
export const formatDate = (
  date: string | Date,
  formatStr: string = 'MMM d, yyyy'
): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(parsedDate)) {
    return 'Invalid date';
  }

  return format(parsedDate, formatStr);
};

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: string | Date,
  options?: { addSuffix?: boolean }
): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(parsedDate)) {
    return 'Invalid date';
  }

  return formatDistanceToNow(parsedDate, { addSuffix: options?.addSuffix ?? true });
};

/**
 * Format a date intelligently based on how recent it is
 * - Today: "Today at 2:30 PM"
 * - Yesterday: "Yesterday at 2:30 PM"
 * - This week: "Monday at 2:30 PM"
 * - Older: "Jan 15, 2024"
 */
export const formatSmartDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(parsedDate)) {
    return 'Invalid date';
  }

  const now = new Date();
  const daysDiff = differenceInDays(now, parsedDate);

  if (daysDiff === 0) {
    return `Today at ${format(parsedDate, 'h:mm a')}`;
  }

  if (daysDiff === 1) {
    return `Yesterday at ${format(parsedDate, 'h:mm a')}`;
  }

  if (daysDiff < 7) {
    return format(parsedDate, "EEEE 'at' h:mm a");
  }

  return format(parsedDate, 'MMM d, yyyy');
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'MMM d, yyyy h:mm a');
};

/**
 * Format time only
 */
export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'h:mm a');
};
