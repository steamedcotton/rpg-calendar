import { RPGCalendarTime } from './types';

export const getTimeString = ({ hour, minute, second }: RPGCalendarTime): string => {
  // Create epoch day with time
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  const s = second.toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
