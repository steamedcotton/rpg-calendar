import { months } from './months';
import { days } from './days';
import { yearSuffix } from './years';

const LEAP_YEAR_INTERVAL = 4;
const DAYS_IN_WEEK = 10;

let daysInYearCache = 0;
let daysInLeapYearCache = 0;

export const isLeapYear = (year: number): boolean => {
  // Every 4 years after the first year there is a leap year
  return year % LEAP_YEAR_INTERVAL === 0;
};

export const getDateFromEpoch = (epoch: number): RPGCalendarDate => {
  // Calculate the year
  let year = 0;
  let dayOfYear = epoch;
  while (dayOfYear >= getDaysInYear(year)) {
    dayOfYear = dayOfYear - getDaysInYear(year);
    year++;
  }

  // Calculate the month of the year
  let monthOfYear = 1;
  let dayOfMonth = dayOfYear;
  while (dayOfMonth > getDaysInMonth(monthOfYear, year)) {
    dayOfMonth = dayOfMonth - getDaysInMonth(monthOfYear, year);
    monthOfYear++;
  }

  // Calculate day of week
  const dayMod = dayOfMonth % DAYS_IN_WEEK;
  const dayOfWeek = dayMod === 0 ? dayOfMonth / DAYS_IN_WEEK : dayMod;

  return {
    year,
    monthOfYear,
    dayOfMonth,
    dayOfYear,
    dayOfWeek,
    dayName: days[dayOfWeek],
    inLeapYear: isLeapYear(year),
    monthName: months[monthOfYear].name,
    yearName: getYearName(year),
    epochDay: epoch
  };
};

export const getDaysInNonLeapYear = (): number => {
  if (!daysInYearCache) {
    daysInYearCache = months.reduce((days, month) => {
      let extraDaysInMonth = 0;
      if (month?.extraDays) {
        extraDaysInMonth = month.extraDays.filter((ed) => !ed.onlyInLeapYear).length;
      }

      return days + month.daysInMonth + extraDaysInMonth;
    }, 0);
  }

  return daysInYearCache;
};

export const getDaysInLeapYear = (): number => {
  if (!daysInLeapYearCache) {
    daysInLeapYearCache = months.reduce((days, month) => {
      let extraDaysInMonth = 0;
      if (month?.extraDays) {
        extraDaysInMonth = month.extraDays.length;
      }

      return days + month.daysInMonth + extraDaysInMonth;
    }, 0);
  }

  return daysInLeapYearCache;
};

export const getDaysInYear = (year: number): number => {
  return isLeapYear(year) ? getDaysInLeapYear() : getDaysInNonLeapYear();
};

export const getDaysInMonth = (month: number, year: number) => {
  let extraDayCount = 0;
  const monthIndex = month - 1;
  if (months[monthIndex]?.extraDays) {
    extraDayCount = months[monthIndex].extraDays.filter((ed) => isLeapYear(year) || !ed.onlyInLeapYear).length;
  }
  return months[month].daysInMonth + extraDayCount;
};

export const getYearName = (year: number) => {
  const yearKey = year.toString(10);
  return `Year of ${yearSuffix?.[yearKey] || 'Unknown'}`;
};
