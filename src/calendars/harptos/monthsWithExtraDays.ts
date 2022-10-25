import { RPGCalendarConfig } from '../../lib/types';
import { weekdays } from './weekdays';
import { yearNameMap } from './years';
import { moons } from './moons';

// This contains months with the extra days (like Midwinter) added in a extra days in the month.
export const monthsWithExtraDays: RPGCalendarConfig = {
  name: 'Harptos - Extra Days',
  hasYear0: true,
  leapYearInterval: 4,
  yearNameMap,
  weekdays,
  moons,
  monthStartOnWeekStart: true,
  months: [
    {
      monthInYear: 1,
      name: 'Hammer',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Midwinter'
        }
      ]
    },
    {
      monthInYear: 2,
      name: 'Alturiak',
      daysInMonth: 30
    },
    {
      monthInYear: 3,
      name: 'Ches',
      daysInMonth: 30
    },
    {
      monthInYear: 4,
      name: 'Tarsakh',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Greengrass'
        }
      ]
    },
    {
      monthInYear: 5,
      name: 'Mirtul',
      daysInMonth: 30
    },
    {
      monthInYear: 6,
      name: 'Kythorn',
      daysInMonth: 30
    },
    {
      monthInYear: 7,
      name: 'Flamerule',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Midsummer'
        },
        {
          name: 'Shieldmeet',
          onlyInLeapYear: true
        }
      ]
    },
    {
      monthInYear: 8,
      name: 'Eleasis',
      daysInMonth: 30
    },
    {
      monthInYear: 9,
      name: 'Eleint',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Highharvestide'
        }
      ]
    },
    {
      monthInYear: 10,
      name: 'Marpenoth',
      daysInMonth: 30
    },
    {
      monthInYear: 11,
      name: 'Uktar',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Feast of the Moon'
        }
      ]
    },
    {
      monthInYear: 12,
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
