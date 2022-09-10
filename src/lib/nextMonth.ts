import { RPGCalendarMonth, RPGCalendarMonthQuery } from './types';

export const getNextMonthYearBuilder =
  (hasYear0 = false, months: RPGCalendarMonth[]) =>
  (monthQuery: RPGCalendarMonthQuery): RPGCalendarMonthQuery => {
    const { month, year } = monthQuery;
    let nextMonth = month + 1;
    let nextYear = year;

    if (nextMonth > months.length) {
      nextMonth = 1;
      nextYear = year + 1;
      if (!hasYear0 && year === 0) {
        nextYear = 1;
      }
    }

    return {
      month: nextMonth,
      year: nextYear
    };
  };
