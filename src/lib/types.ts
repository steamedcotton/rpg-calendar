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
}

export interface RPGCalendarMonthQuery {
  month: number;
  year: number;
}

export interface RPGCalendarMonthDisplay extends RPGCalendarMonth {
  weeks: RPGCalendarDate[][];
  nextMonthQuery: RPGCalendarMonthQuery;
  prevMonthQuery: RPGCalendarMonthQuery;
}
