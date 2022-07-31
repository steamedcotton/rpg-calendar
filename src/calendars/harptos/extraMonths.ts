import { RPGCalendarConfig } from '../../types';
import { MonthTypes } from '../../monthTypes';
import { weekdays } from './weekdays';
import { yearNameMap } from './years';

export const extraMonths: RPGCalendarConfig = {
  name: 'Harptos - Extra Days',
  hasYear0: true,
  leapYearInterval: 4,
  weekdays,
  yearNameMap,
  months: [
    {
      name: 'Hammer',
      daysInMonth: 30
    },
    {
      name: 'Midwinter',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
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
      daysInMonth: 30
    },
    {
      name: 'Greengrass',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
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
      daysInMonth: 30
    },

    {
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
      name: 'Eleasis',
      daysInMonth: 30
    },
    {
      name: 'Eleint',
      daysInMonth: 30
    },
    {
      name: 'Highharvestide',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
    },
    {
      name: 'Marpenoth',
      daysInMonth: 30
    },
    {
      name: 'Uktar',
      daysInMonth: 30
    },
    {
      name: 'Feast of the Moon',
      daysInMonth: 1,
      type: MonthTypes.INTER_CAL
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
