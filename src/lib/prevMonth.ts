import { RPGCalendarMonth, RPGCalendarMonthQuery } from './types';

export const getPrevMonthYearBuilder =
  (hasYear0 = false, months: RPGCalendarMonth[]) =>
  (monthQuery: RPGCalendarMonthQuery): RPGCalendarMonthQuery => {
    const { month, year } = monthQuery;
    let prevMonth = month - 1;
    let prevYear = year;

    if (prevMonth <= 0) {
      prevMonth = months.length;
      prevYear = year - 1;
      if (!hasYear0 && year === 0) {
        prevYear = -1;
      }
    }

    return {
      month: prevMonth,
      year: prevYear
    };
  };
