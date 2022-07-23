export abstract class CalendarBase {
  abstract epochDateToFCDate(epochDate: number | string): RPGCalendarDate;
}
