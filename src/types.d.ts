interface ExtraDays {
  name: string;
  onlyInLeapYear: boolean;
}

interface RPGCalendarMonth {
  name: string;
  daysInMonth: number;
  extraDays?: ExtraDays[];
}

interface RPGCalendarMoonPhase {
  icon?: string;
  name?: string;
  value?: string;
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
