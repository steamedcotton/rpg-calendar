import { RPGCalendarConfig } from '../../lib/types';
import { weekdays } from './weekdays';
import { months } from './months';
import { seasons } from './seasons';
import { hoursInDay, minutesInHour, secondsInMinutes } from './time';
import { gregorianIsLeapYear } from './leapYear';

export const gregorian: RPGCalendarConfig = {
  name: 'Gregorian',
  hasYear0: false,
  isLeapYear: gregorianIsLeapYear,
  weekdays,
  months,
  seasons,
  monthStartOnWeekStart: false,
  hoursInDay,
  minutesInHour,
  secondsInMinutes
};
