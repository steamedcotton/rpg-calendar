import { RPGCalendarExtraDay, RPGCalendarMonth } from './types';

export const getExtraDayBuilder =
  (months: RPGCalendarMonth[], isLeapYear: (year: number) => boolean) =>
  (year: number, month: number, day: number): RPGCalendarExtraDay | undefined => {
    const currentMonth = months[month - 1];
    const { daysInMonth, extraDays = [] } = currentMonth;

    if (day > daysInMonth && extraDays.length > 0) {
      const extraDayNumber = day - daysInMonth;

      if (extraDays.length >= extraDayNumber) {
        if (extraDays[extraDayNumber - 1].onlyInLeapYear && isLeapYear(year)) {
          return extraDays[extraDayNumber - 1];
        } else if (!extraDays[extraDayNumber - 1].onlyInLeapYear) {
          return extraDays[extraDayNumber - 1];
        }
      }
    }

    return undefined;
  };
