import { RPGCalendarMonthQuery } from './types';

export const getNextYearBuilder =
  (hasYear0 = false) =>
  ({ month, year }: RPGCalendarMonthQuery): RPGCalendarMonthQuery => ({
    month,
    year: !hasYear0 && year === -1 ? 1 : year + 1
  });
