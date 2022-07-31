import { isLeapYearBuilder } from './leapYear';
import { RPGCalendarMonth } from '../types';
import { getDaysInMonthBuilder } from './daysInMonth';

const isLeapYear4Years = isLeapYearBuilder(4, true);

describe('Days in month', () => {
  test('Simple days in month', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11
      }
    ];
    const getDaysInMonth = getDaysInMonthBuilder(months, isLeapYear4Years);

    expect(getDaysInMonth(1, 1999)).toBe(9);
    expect(getDaysInMonth(2, 1999)).toBe(11);
  });

  test('Months with extra days', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9,
        extraDays: [
          {
            name: 'extra 1'
          },
          {
            name: 'extra 2'
          }
        ]
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11,
        extraDays: [
          {
            name: 'another extra day'
          }
        ]
      }
    ];
    const getDaysInMonth = getDaysInMonthBuilder(months, isLeapYear4Years);

    expect(getDaysInMonth(1, 1999)).toBe(11);
    expect(getDaysInMonth(2, 1999)).toBe(12);
  });

  test('Months with extra days and leap day', () => {
    const months: RPGCalendarMonth[] = [
      {
        name: 'Test Month 1',
        daysInMonth: 9,
        extraDays: [
          {
            name: 'extra 1'
          },
          {
            name: 'leap day',
            onlyInLeapYear: true
          }
        ]
      },
      {
        name: 'Test Month 2',
        daysInMonth: 11,
        extraDays: [
          {
            name: 'another extra day'
          }
        ]
      }
    ];
    const getDaysInMonth = getDaysInMonthBuilder(months, isLeapYear4Years);

    expect(getDaysInMonth(1, 3)).toBe(10);
    expect(getDaysInMonth(1, 4)).toBe(11);
    expect(getDaysInMonth(2, 1999)).toBe(12);
  });
});
