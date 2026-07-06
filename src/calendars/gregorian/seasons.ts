import { RPGCalendarSeason } from '../../lib/types';

// Northern-hemisphere astronomical seasons keyed to typical solstice/equinox dates.
export const seasons: RPGCalendarSeason[] = [
  { name: 'Winter', monthOfYear: 1, dayOfMonth: 1 },
  { name: 'Spring', monthOfYear: 3, dayOfMonth: 20 },
  { name: 'Summer', monthOfYear: 6, dayOfMonth: 21 },
  { name: 'Autumn', monthOfYear: 9, dayOfMonth: 22 },
  { name: 'Winter', monthOfYear: 12, dayOfMonth: 21 }
];
