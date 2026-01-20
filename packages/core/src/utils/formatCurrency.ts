type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW';

interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Format a number as currency
 */
export const formatCurrency = (
  amount: number,
  options: FormatCurrencyOptions = {}
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

/**
 * Format a number as compact currency (e.g., $1.2K, $1.5M)
 */
export const formatCompactCurrency = (
  amount: number,
  currency: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Parse a currency string back to a number
 */
export const parseCurrency = (value: string): number => {
  // Remove currency symbols, spaces, and commas
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format a number with thousands separators
 */
export const formatNumber = (
  value: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a number as a percentage
 */
export const formatPercentage = (
  value: number,
  options?: { decimals?: number; locale?: string }
): string => {
  const { decimals = 0, locale = 'en-US' } = options || {};

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};
