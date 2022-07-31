import { RPGCalendarConfig } from '../../lib/types';
import { weekdays } from './weekdays';
import { yearNameMap } from './years';

export const extraDays: RPGCalendarConfig = {
  name: 'Harptos - Extra Days',
  hasYear0: true,
  leapYearInterval: 4,
  yearNameMap,
  weekdays,
  months: [
    {
      name: 'Hammer',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Midwinter'
        }
      ]
    },
    {
      name: 'Alturiak',
      daysInMonth: 30
    },
    {
      name: 'Ches',
      daysInMonth: 30
    },
    {
      name: 'Tarsakh',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Greengrass'
        }
      ]
    },
    {
      name: 'Mirtul',
      daysInMonth: 30
    },
    {
      name: 'Kythorn',
      daysInMonth: 30
    },
    {
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
      name: 'Eleasis',
      daysInMonth: 30
    },
    {
      name: 'Eleint',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Highharvestide'
        }
      ]
    },
    {
      name: 'Marpenoth',
      daysInMonth: 30
    },
    {
      name: 'Uktar',
      daysInMonth: 30,
      extraDays: [
        {
          name: 'Feast of the Moon'
        }
      ]
    },
    {
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
