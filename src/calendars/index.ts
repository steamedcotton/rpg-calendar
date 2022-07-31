import { extraDays } from './harptos/extraDays';
import { extraMonths } from './harptos/extraMonths';

export const calendars = {
  harptos: {
    // The special days are presented as additional months (intercalation months)
    extraMonths,

    // The special days are presented as extra days at the end of the month preceding it.
    extraDays,

    // This is the default calendar for harptos.
    standard: extraDays
  }
};
