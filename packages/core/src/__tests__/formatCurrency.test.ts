import { formatCurrency, formatCompactCurrency, parseCurrency, formatNumber, formatPercentage } from '../utils/formatCurrency';

describe('formatCurrency', () => {
  it('should format positive amounts correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should format negative amounts correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });

  it('should handle different currencies', () => {
    expect(formatCurrency(1234.56, 'EUR')).toContain('1,234.56');
  });
});

describe('formatCompactCurrency', () => {
  it('should format thousands with K suffix', () => {
    const result = formatCompactCurrency(1500);
    expect(result).toMatch(/1\.5K|\$1\.5K/);
  });

  it('should format millions with M suffix', () => {
    const result = formatCompactCurrency(1500000);
    expect(result).toMatch(/1\.5M|\$1\.5M/);
  });
});

describe('parseCurrency', () => {
  it('should parse formatted currency strings', () => {
    expect(parseCurrency('$1,234.56')).toBe(1234.56);
  });

  it('should handle strings without currency symbol', () => {
    expect(parseCurrency('1234.56')).toBe(1234.56);
  });

  it('should handle negative values', () => {
    expect(parseCurrency('-$1,234.56')).toBe(-1234.56);
  });
});

describe('formatNumber', () => {
  it('should format numbers with default decimals', () => {
    expect(formatNumber(1234.567)).toBe('1,234.57');
  });

  it('should respect decimal places parameter', () => {
    expect(formatNumber(1234.567, 0)).toBe('1,235');
    expect(formatNumber(1234.567, 3)).toBe('1,234.567');
  });
});

describe('formatPercentage', () => {
  it('should format percentages correctly', () => {
    expect(formatPercentage(0.1234)).toBe('12.34%');
  });

  it('should handle whole percentages', () => {
    expect(formatPercentage(0.5)).toBe('50.00%');
  });

  it('should respect decimal places parameter', () => {
    expect(formatPercentage(0.1234, 0)).toBe('12%');
  });
});
