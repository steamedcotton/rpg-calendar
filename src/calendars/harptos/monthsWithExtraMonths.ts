import { RPGCalendarConfig } from '../../lib/types';
import { MonthTypes } from '../../lib/monthTypes';
import { weekdays } from './weekdays';
import { yearNameMap } from './years';
import { moons } from './moons';

// This contains the months of the years with the extra days (like Midwinter) as separate months.
export const monthsWithExtraMonths: RPGCalendarConfig = {
  name: 'Harptos - Extra Days',
  hasYear0: true,
  leapYearInterval: 4,
  weekdays,
  yearNameMap,
  moons,
  monthStartOnWeekStart: true,
  months: [
    {
      monthInYear: 1,
      name: 'Hammer',
      daysInMonth: 30
    },
    {
      monthInYear: 2,
      name: 'Midwinter',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
    },
    {
      monthInYear: 3,
      name: 'Alturiak',
      daysInMonth: 30
    },
    {
      monthInYear: 4,
      name: 'Ches',
      daysInMonth: 30
    },
    {
      monthInYear: 5,
      name: 'Tarsakh',
      daysInMonth: 30
    },
    {
      monthInYear: 6,
      name: 'Greengrass',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
    },
    {
      monthInYear: 7,
      name: 'Mirtul',
      daysInMonth: 30
    },
    {
      monthInYear: 8,
      name: 'Kythorn',
      daysInMonth: 30
    },
    {
      monthInYear: 9,
      name: 'Flamerule',
      daysInMonth: 30
    },
    {
      monthInYear: 10,
      name: 'Midsummer',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL,
      extraDays: [
        {
          name: 'Shieldmeet'
        }
      ]
    },
    {
      monthInYear: 11,
      name: 'Eleasis',
      daysInMonth: 30
    },
    {
      monthInYear: 12,
      name: 'Eleint',
      daysInMonth: 30
    },
    {
      monthInYear: 13,
      name: 'Highharvestide',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
    },
    {
      monthInYear: 14,
      name: 'Marpenoth',
      daysInMonth: 30
    },
    {
      monthInYear: 15,
      name: 'Uktar',
      daysInMonth: 30
    },
    {
      monthInYear: 16,
      name: 'Feast of the Moon',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
    },
    {
      monthInYear: 17,
      name: 'Nightal',
      daysInMonth: 30
    }
  ],
  seasons: [
    {
      name: 'Winter',
      monthOfYear: 1,
      dayOfMonth: 1
    },
    {
      name: 'Spring',
      monthOfYear: 3,
      dayOfMonth: 19
    },
    {
      name: 'Summer',
      monthOfYear: 6,
      dayOfMonth: 20
    },
    {
      name: 'Autumn',
      monthOfYear: 9,
      dayOfMonth: 21
    },
    {
      name: 'Winter',
      monthOfYear: 12,
      dayOfMonth: 20
    }
  ]
};
