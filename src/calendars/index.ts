import { monthsWithExtraDays } from './harptos/monthsWithExtraDays';
import { monthsWithExtraMonths } from './harptos/monthsWithExtraMonths';

export const calendars = {
  harptos: {
    // The special days are presented as additional months (intercalation months)
    extraMonths: monthsWithExtraMonths,

    // The special days are presented as extra days at the end of the month preceding it.
    extraDays: monthsWithExtraDays,

    // This is the default calendar for harptos.
    standard: monthsWithExtraDays
  }
};
