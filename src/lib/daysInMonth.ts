import { RPGCalendarMonth } from './types';

export const getDaysInMonthBuilder =
  (months: RPGCalendarMonth[], isLeapYear: (year: number) => boolean) =>
  (month: number, year: number): number => {
    let extraDayCount = 0;
    const monthIndex = month - 1;
    if (months[monthIndex] !== undefined && months[monthIndex].daysInMonth !== undefined) {
      const { extraDays = [] } = months[monthIndex];
      extraDayCount = extraDays.filter((ed) => isLeapYear(year) || !ed.onlyInLeapYear).length;
      return months[monthIndex].daysInMonth + extraDayCount;
    }
    throw new Error(`Unable to find information for month ${month} and year ${year}`);
  };
