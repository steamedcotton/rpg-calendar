import { getDaysInYearBuilder } from './daysInYear';
import { RPGCalendarMonth } from './types';
import { isLeapYearBuilder } from './leapYear';

const isLeapYear4Years = isLeapYearBuilder(4, true);

describe('Days in year', () => {
  test('Months with no leap days (leap-year every 4 years)', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9,
        monthInYear: 1
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11,
        monthInYear: 2
      }
    ];
    const getDaysInYear = getDaysInYearBuilder(months, isLeapYear4Years);

    expect(getDaysInYear(2)).toBe(20);
    expect(getDaysInYear(30)).toBe(20);
    expect(getDaysInYear(2000000)).toBe(20);
  });

  test('Months with extra days (leap-year every 4 years)', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9,
        extraDays: [
          {
            name: 'an extra day'
          },
          {
            name: 'another extra day'
          }
        ],
        monthInYear: 2
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11,
        monthInYear: 2
      }
    ];
    const getDaysInYear = getDaysInYearBuilder(months, isLeapYear4Years);

    expect(getDaysInYear(2)).toBe(22);
    expect(getDaysInYear(30)).toBe(22);
    expect(getDaysInYear(2000000)).toBe(22);
  });

  test('Months with one leap day (leap-year every 4 years)', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9,
        extraDays: [
          {
            name: 'A leap day!',
            onlyInLeapYear: true
          }
        ],
        monthInYear: 1
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11,
        monthInYear: 2
      }
    ];
    const getDaysInYear = getDaysInYearBuilder(months, isLeapYear4Years);

    expect(getDaysInYear(2)).toBe(20);
    expect(getDaysInYear(30)).toBe(20);
    expect(getDaysInYear(4)).toBe(21);
    expect(getDaysInYear(2000000)).toBe(21);
  });
});
