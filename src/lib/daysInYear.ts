import { RPGCalendarMonth } from './types';

export const getDaysInYearBuilder = (months: RPGCalendarMonth[], isLeapYear: (year: number) => boolean) => {
  // We use the days in year a lot, so calculate the variables ahead of time

  // Days in a normal year
  const daysInYear = months.reduce((days, month) => {
    let extraDaysInMonth = 0;
    if (month?.extraDays) {
      extraDaysInMonth = month.extraDays.filter((ed) => !ed.onlyInLeapYear).length;
    }

    return days + month.daysInMonth + extraDaysInMonth;
  }, 0);

  // Days in a leap-year
  const daysInLeapYear = months.reduce((days, month) => {
    let extraDaysInMonth = 0;
    if (month?.extraDays) {
      extraDaysInMonth = month.extraDays.length;
    }

    return days + month.daysInMonth + extraDaysInMonth;
  }, 0);

  return (year: number): number => (isLeapYear(year) ? daysInLeapYear : daysInYear);
};
