import { MonthTypes } from './monthTypes';

export interface RPGCalendarConfig {
  name: string;
  leapYearInterval?: number;
  hasYear0?: boolean;
  weekdays: RPGCalendarWeekday[];
  months: RPGCalendarMonth[];
  seasons: RPGCalendarSeason[];
  yearNameMap?: Record<string, string>;
  hoursInDay?: number;
  minutesInHour?: number;
  secondsInMinutes?: number;
  monthStartOnWeekStart: boolean;
}

export interface RPGCalendarExtraDay {
  name: string;
  onlyInLeapYear?: boolean;
}

export interface RPGCalendarSeason {
  name: string;
  dayOfMonth: number;
  monthOfYear: number;
}

export interface RPGCalendarMonth {
  name: string;
  daysInMonth: number;
  monthInYear: number;
  type?: MonthTypes;
  extraDays?: RPGCalendarExtraDay[];
}

export interface RPGCalendarMoonPhase {
  icon?: string;
  name?: string;
  value?: string;
}

export interface RPGCalendarWeekday {
  name: string;
}

export interface RPGCalendarTime {
  hour?: number;
  minute?: number;
  second?: number;
}

export interface RPGCalendarDate {
  dayName?: string;
  dayOfMonth?: number;
  dayOfWeek?: number;
  dayOfYear?: number;
  epochDay?: number;
  epochDayTime?: string;
  inLeapYear?: boolean;
  monthName?: string;
  monthOfYear?: number;
  moonPhase?: RPGCalendarMoonPhase;
  season?: string;
  time?: RPGCalendarTime;
  year?: number;
  yearName?: string;
  extraDay?: RPGCalendarExtraDay;
}

export interface RPGCalendarMonthQuery {
  month: number;
  year: number;
}

export interface RPGCalendarMonthDisplay extends RPGCalendarMonth {
  year: number;
  monthOfYear: number;
  yearName?: string;
  weeks: RPGCalendarDate[][];
  weekdays: RPGCalendarWeekday[];
  nextMonthQuery: RPGCalendarMonthQuery;
  prevMonthQuery: RPGCalendarMonthQuery;
  nextYearQuery: RPGCalendarMonthQuery;
  prevYearQuery: RPGCalendarMonthQuery;
}

// RPGDateSpan is a simple date container with a start and end RPGCalendarDate.  This can be used for representing spans
// of time.
export interface RPGDateSpan {
  start: RPGCalendarDate;
  end: RPGCalendarDate;
}
