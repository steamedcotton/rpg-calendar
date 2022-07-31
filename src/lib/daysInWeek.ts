import { RPGCalendarWeekday } from '../types';

export const getDaysInWeekBuilder = (weekdays: RPGCalendarWeekday[]) => {
  const daysInWeek = weekdays.length;
  return () => daysInWeek;
};
