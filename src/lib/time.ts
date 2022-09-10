import { RPGCalendarTime } from './types';

export const getTimeString = ({ hour = 0, minute = 0, second = 0 }: RPGCalendarTime): string => {
  // Create epoch day with time
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  const s = second.toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
