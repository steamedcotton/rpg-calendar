import {
  RPGCalendarConfig,
  RPGCalendarDate,
  RPGCalendarMonthDisplay,
  RPGCalendarTime,
  RPGCalendarMonth,
  RPGCalendarMonthQuery
} from './lib/types';
import {
  isLeapYearBuilder,
  getDaysInYearBuilder,
  getDaysInMonthBuilder,
  getDaysInWeekBuilder,
  getYearNameBuilder,
  getPrevMonthYearBuilder,
  getNextMonthYearBuilder
} from './lib';
import { getTimeString } from './lib/time';

export class Calendar {
  // Utility functions
  private isLeapYear: (year: number) => boolean;
  private getDaysInYear: (year: number) => number;
  private getDaysInMonth: (month: number, year: number) => number;
  private getDaysInWeek: () => number;
  private getYearName: (year: number) => string;
  private getDayName: (dayOfWeek: number) => string;
  private getMonthName: (month: number) => string;
  private getConfigMonth: (month: number) => RPGCalendarMonth;
  private getNextMonthYear: (monthQuery: RPGCalendarMonthQuery) => RPGCalendarMonthQuery;
  private getPrevMonthYear: (monthQuery: RPGCalendarMonthQuery) => RPGCalendarMonthQuery;

  constructor(private config: RPGCalendarConfig) {
    this.isLeapYear = isLeapYearBuilder(config?.leapYearInterval || 0, config?.hasYear0);
    this.getDaysInYear = getDaysInYearBuilder(config.months, this.isLeapYear);
    this.getDaysInMonth = getDaysInMonthBuilder(config.months, this.isLeapYear);
    this.getDaysInWeek = getDaysInWeekBuilder(config.weekdays);
    this.getYearName = getYearNameBuilder(config.yearNameMap);
    this.getDayName = (dayOfWeek: number): string => this.config.weekdays?.[dayOfWeek - 1]?.name || 'Unknown';
    this.getMonthName = (month: number): string => this.config.months?.[month]?.name || 'Unknown';
    this.getConfigMonth = (month: number): RPGCalendarMonth => this.config.months[month];
    this.getPrevMonthYear = getPrevMonthYearBuilder(config?.hasYear0, this.config.months);
    this.getNextMonthYear = getNextMonthYearBuilder(config?.hasYear0, this.config.months);
  }

  // dateStringToRPGDate accepts the date in a more readable format, parses it and returns an RPGCalendarDate object.
  // dateString resembles the ISO 8601 format but without the fractional seconds: YYYY-MM-DD hh:mm:ss
  dateStringToRPGDate(dateString: string): RPGCalendarDate {
    const dateAndTime = dateString.split(' ');
    if (dateAndTime.length !== 2) {
      throw new Error(`${dateString} is not a valid date time string format`);
    }
    const dateParts = dateAndTime[0].split('-');
    if (dateParts.length !== 3) {
      throw new Error(`${dateString} does not contain a valid date part`);
    }

    const timeParts = dateAndTime[1].split(':');
    if (timeParts.length !== 3) {
      throw new Error(`${dateString} does not contain a valid time part`);
    }

    // Assign known values
    const time: RPGCalendarTime = {
      hour: parseInt(timeParts[0]),
      minute: parseInt(timeParts[1]),
      second: parseInt(timeParts[2])
    };
    const year = parseInt(dateParts[0]);
    const monthOfYear = parseInt(dateParts[1]);
    const dayOfMonth = parseInt(dateParts[2]);

    // Calculate day of week
    const daysInWeek = this.getDaysInWeek();
    const dayMod = dayOfMonth % daysInWeek;
    const dayOfWeek = dayMod === 0 ? dayOfMonth / daysInWeek : dayMod;

    return {
      time,
      year,
      dayOfMonth,
      monthOfYear,
      dayOfWeek,
      dayName: this.getDayName(dayOfWeek),
      inLeapYear: this.isLeapYear(year),
      monthName: this.getMonthName(monthOfYear),
      yearName: this.getYearName(year)
    };
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

    const epochDayTime = `${epochDay}-${getTimeString(time)}`;

    return {
      year,
      epochDay,
      epochDayTime,
      monthOfYear,
      dayOfMonth,
      dayOfYear,
      dayOfWeek,
      dayName: this.getDayName(dayOfWeek),
      inLeapYear: this.isLeapYear(year),
      monthName: this.getMonthName(monthOfYear),
      yearName: this.getYearName(year),
      time
    };
  }

  // createDate is a simple interface that lets you construct a date object.  Only the year is required, everything else
  // defaults (first month, first day, and 00:00:00)
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

    // Calculate day of week
    const daysInWeek = this.getDaysInWeek();
    const dayMod = day % daysInWeek;
    const dayOfWeek = dayMod === 0 ? day / daysInWeek : dayMod;

    // Setup time
    const time = {
      hour,
      minute,
      second
    };
    const epochDayTime = `${epochDay}-${getTimeString(time)}`;

    return {
      year,
      epochDay,
      epochDayTime,
      monthOfYear: month,
      dayOfMonth: day,
      dayOfYear,
      dayOfWeek,
      dayName: this.getDayName(dayOfWeek),
      inLeapYear: this.isLeapYear(year),
      monthName: this.getMonthName(month),
      yearName: this.getYearName(year),
      time
    };
  }

  // getDisplayMonth returns a month object based on the month and year
  getDisplayMonth(year: number, month: number): RPGCalendarMonthDisplay {
    // Get the month as it's defined in the configuration
    const configMonth = this.getConfigMonth(month);

    // Get the first day of the month so that we can pull off all the information that pertains to the entire month.
    const firstDayOfMonth = this.createDate(year, month, 1);
    const { monthName, monthOfYear, inLeapYear, epochDay: epochDayStart } = firstDayOfMonth;
    const daysInMonth = this.getDaysInMonth(month, year);
    const daysInWeek = this.getDaysInWeek();
    const weeks: RPGCalendarDate[][] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = d % daysInWeek || daysInWeek;
      const w = Math.floor((d - 1) / daysInWeek);
      if (!weeks?.[w]) {
        weeks.push([]);
      }

      weeks[w].push({
        dayOfWeek,
        inLeapYear,
        monthName,
        year,
        dayName: this.getDayName(dayOfWeek),
        monthOfYear,
        dayOfMonth: d,
        epochDay: epochDayStart + (d - 1)
      });
    }

    return {
      ...configMonth,
      weeks,
      nextMonthQuery: this.getNextMonthYear({ year, month }),
      prevMonthQuery: this.getPrevMonthYear({ year, month })
    };
  }
}
