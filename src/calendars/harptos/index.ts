import { CalendarBase } from '../CalendarBase';
import { getDateFromEpoch } from './rules';

export class Harptos extends CalendarBase {
  epochDateToFCDate(epochDate: number | string): RPGCalendarDate {
    if (typeof epochDate === 'string') {
      return getDateFromEpoch(parseInt(epochDate));
    }
    return getDateFromEpoch(epochDate);
  }
}
