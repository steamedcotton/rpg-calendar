import { RPGCalendarConfig, RPGCalendarDate, RPGCalendarTime } from './types';
import { isLeapYearBuilder, getDaysInYearBuilder, getDaysInMonthBuilder, getDaysInWeekBuilder, getYearNameBuilder } from './lib';

export class Calendar {
  // Utility functions
  private isLeapYear: (year: number) => boolean;
  private getDaysInYear: (year: number) => number;
  private getDaysInMonth: (month: number, year: number) => number;
  private getDaysInWeek: () => number;
  private getYearName: (year: number) => string;

  constructor(private config: RPGCalendarConfig) {
    this.isLeapYear = isLeapYearBuilder(config?.leapYearInterval || 0, config?.hasYear0);
    this.getDaysInYear = getDaysInYearBuilder(config.months, this.isLeapYear);
    this.getDaysInMonth = getDaysInMonthBuilder(config.months, this.isLeapYear);
    this.getDaysInWeek = getDaysInWeekBuilder(config.weekdays);
    this.getYearName = getYearNameBuilder(config.yearNameMap);
  }

  // epochToDate accepts both a simple day epoch (number of days) or a complex epoch (number of days with the time)
  epochToDate(epoch: number | string): RPGCalendarDate {
    let epochDay: number;
    let time: RPGCalendarTime = {
      hour: 0,
      minute: 0,
      second: 0
    };

    if (typeof epoch === 'string') {
      const dateParts = epoch.split('-');
      if (dateParts.length !== 2) {
        throw new Error(`${epoch} is not a valid date time epoch format`);
      }
      const timeParts = dateParts[1].split(':');
      if (timeParts.length !== 3) {
        throw new Error(`${epoch} is not a valid time format`);
      }

      time = {
        hour: parseInt(timeParts[0]),
        minute: parseInt(timeParts[1]),
        second: parseInt(timeParts[2])
      };

      epochDay = parseInt(dateParts[0]);
    } else {
      epochDay = epoch;
    }

    // Calculate the year
    let year = 0;
    let dayOfYear = epochDay;
    while (dayOfYear >= this.getDaysInYear(year)) {
      dayOfYear = dayOfYear - this.getDaysInYear(year);
      year++;
    }

    // Calculate the month of the year
    let monthOfYear = 1;
    let dayOfMonth = dayOfYear;
    while (dayOfMonth > this.getDaysInMonth(monthOfYear, year)) {
      dayOfMonth = dayOfMonth - this.getDaysInMonth(monthOfYear, year);
      monthOfYear++;
    }

    // Calculate day of week
    const daysInWeek = this.getDaysInWeek();
    const dayMod = dayOfMonth % daysInWeek;
    const dayOfWeek = dayMod === 0 ? dayOfMonth / daysInWeek : dayMod;

    return {
      year,
      epochDay,
      monthOfYear,
      dayOfMonth,
      dayOfYear,
      dayOfWeek,
      dayName: this.config.weekdays?.[dayOfWeek - 1]?.name || 'Unknown',
      inLeapYear: this.isLeapYear(year),
      monthName: this.config.months?.[monthOfYear]?.name || 'Unknown',
      yearName: this.getYearName(year),
      time
    };
  }

  createDate(year: number, month = 1, day = 1, hour = 0, minute = 0, second = 0): RPGCalendarDate {
    const startYear = this.config?.hasYear0 ? 0 : 1;

    // Count the days up to the year
    let epochDay = 0;
    for (let y = startYear; y < year; y++) {
      epochDay += this.getDaysInYear(y);
    }

    // Count the days up to the month
    let dayOfYear = 0;
    for (let m = 1; m < month; m++) {
      epochDay += this.getDaysInMonth(m, year);
    }

    // Add in the days
    epochDay += day;
    dayOfYear += day;

    return {
      year,
      epochDay,
      monthOfYear: month,
      dayOfMonth: day,
      dayOfYear,
      // dayOfWeek,
      // dayName: this.config.weekdays?.[dayOfWeek - 1]?.name || 'Unknown',
      inLeapYear: this.isLeapYear(year),
      monthName: this.config.months?.[month]?.name || 'Unknown',
      yearName: this.getYearName(year),
      time: {
        hour,
        minute,
        second
      }
    };
  }
}
