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
  // Optional override for leap-year detection. When provided it wins over leapYearInterval.
  // Needed for calendars like Gregorian whose rule can't be expressed as a simple interval.
  isLeapYear?: (year: number, hasYear0?: boolean) => boolean;
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

// RPGCalendarMonthDisplay carries a resolved view of a month for rendering. The `extraDays` field
// here is the list of intercalary days resolved to full RPGCalendarDate objects (with epochDay),
// which differs from RPGCalendarMonth.extraDays (the config-level RPGCalendarExtraDay metadata).
export interface RPGCalendarMonthDisplay extends Omit<RPGCalendarMonth, 'extraDays'> {
  year: number;
  monthOfYear: number;
  yearName?: string;
  weeks: RPGCalendarDate[][];
  extraDays: RPGCalendarDate[];
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
