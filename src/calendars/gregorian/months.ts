import { RPGCalendarMonth } from '../../lib/types';

// Standard Gregorian months. February is 28 days plus a leap-year-only intercalary "29 February",
// mirroring how Harptos models Shieldmeet. This keeps the regular grid a fixed shape year over year.
export const months: RPGCalendarMonth[] = [
  { monthInYear: 1, name: 'January', daysInMonth: 31 },
  {
    monthInYear: 2,
    name: 'February',
    daysInMonth: 28,
    extraDays: [{ name: '29 February', onlyInLeapYear: true }]
  },
  { monthInYear: 3, name: 'March', daysInMonth: 31 },
  { monthInYear: 4, name: 'April', daysInMonth: 30 },
  { monthInYear: 5, name: 'May', daysInMonth: 31 },
  { monthInYear: 6, name: 'June', daysInMonth: 30 },
  { monthInYear: 7, name: 'July', daysInMonth: 31 },
  { monthInYear: 8, name: 'August', daysInMonth: 31 },
  { monthInYear: 9, name: 'September', daysInMonth: 30 },
  { monthInYear: 10, name: 'October', daysInMonth: 31 },
  { monthInYear: 11, name: 'November', daysInMonth: 30 },
  { monthInYear: 12, name: 'December', daysInMonth: 31 }
];
