import { isLeapYearBuilder } from './leapYear';

describe('Leap Year', () => {
  test('checking leap year for has year 0 and every 4 years', () => {
    const isLeapYear = isLeapYearBuilder(4, true);

    expect(isLeapYear(0)).toBe(true);
    expect(isLeapYear(4)).toBe(true);
    expect(isLeapYear(5)).toBe(false);
    expect(isLeapYear(1380)).toBe(true);
  });

  test('checking leap year for no year 0 and every 4 years', () => {
    const isLeapYear = isLeapYearBuilder(4, false);

    expect(() => isLeapYear(0)).toThrow('Invalid year');
    expect(isLeapYear(4)).toBe(true);
    expect(isLeapYear(5)).toBe(false);
    expect(isLeapYear(1380)).toBe(true);
  });
});
