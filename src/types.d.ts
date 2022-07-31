import { MonthTypes } from './monthTypes';

interface RPGCalendarConfig {
  name: string;
  leapYearInterval?: number;
  hasYear0?: boolean;
  weekdays: RPGCalendarWeekday[];
  months: RPGCalendarMonth[];
  seasons: RPGCalendarSeason[];
  yearNameMap?: Record<string, string>;
}

interface RPGCalendarExtraDay {
  name: string;
  onlyInLeapYear?: boolean;
}

interface RPGCalendarSeason {
  name: string;
  dayOfMonth: number;
  monthOfYear: number;
}

interface RPGCalendarMonth {
  name: string;
  daysInMonth: number;
  extraDays?: RPGCalendarExtraDay[];
  type?: MonthTypes;
}

interface RPGCalendarMoonPhase {
  icon?: string;
  name?: string;
  value?: string;
}

interface RPGCalendarWeekday {
  name: string;
}

interface RPGCalendarTime {
  hour?: number;
  minute?: number;
  second?: number;
}

type RPGCalendarDate = {
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
};
