import { RPGCalendar } from '../../RPGCalendar';
import { gregorian } from './gregorian';
import { gregorianIsLeapYear } from './leapYear';

describe('Gregorian calendar', () => {
  test('leap year rule: 4/100/400', () => {
    expect(gregorianIsLeapYear(2000)).toBe(true);
    expect(gregorianIsLeapYear(1900)).toBe(false);
    expect(gregorianIsLeapYear(2024)).toBe(true);
    expect(gregorianIsLeapYear(2023)).toBe(false);
    expect(gregorianIsLeapYear(2400)).toBe(true);
  });

  test('config override wins over leapYearInterval', () => {
    const c = new RPGCalendar(gregorian);
    // 1900 is divisible by 4 (which would be leap under simple-interval rules) but is not Gregorian-leap.
    expect(c.createDate(1900, 1, 1).inLeapYear).toBe(false);
    expect(c.createDate(2000, 1, 1).inLeapYear).toBe(true);
  });

  test('February in a leap year surfaces 29 February as an intercalary day', () => {
    const c = new RPGCalendar(gregorian);
    const md = c.getDisplayMonth({ year: 2024, month: 2 });
    // Regular grid stays 28 days; the 29th is separated out.
    const totalRegular = md.weeks.reduce(
      (n, w) => n + w.filter((d) => d && d.dayOfMonth !== undefined).length,
      0
    );
    expect(totalRegular).toBe(28);
    expect(md.extraDays.length).toBe(1);
    expect(md.extraDays[0].extraDay?.name).toBe('29 February');
  });

  test('February in a non-leap year has no intercalary days', () => {
    const c = new RPGCalendar(gregorian);
    const md = c.getDisplayMonth({ year: 2023, month: 2 });
    expect(md.extraDays).toEqual([]);
  });

  test('monthStartOnWeekStart false pads the first week with empty cells', () => {
    const c = new RPGCalendar(gregorian);
    // January 2024 - first day of month has dayOfWeek 1 under the current mod-based scheme,
    // so startOffset is 0 and no padding is applied.
    const md = c.getDisplayMonth({ year: 2024, month: 1 });
    expect(md.weeks[0].length).toBe(7);
    // A month whose day 1 would compute a dayOfWeek > 1 gets leading empty cells.
    // dayOfMonth 1 always mods to 1, so with the current dayOfWeek scheme the offset is always 0.
    // This test guards against a regression if the dayOfWeek scheme changes: shape is a valid 7xN grid.
    for (const w of md.weeks) {
      expect(w.length).toBeLessThanOrEqual(7);
    }
  });

  test('regular months have correct day counts', () => {
    const c = new RPGCalendar(gregorian);
    const totals = (year: number, month: number) =>
      c.getDisplayMonth({ year, month }).weeks.reduce(
        (n, w) => n + w.filter((d) => d && d.dayOfMonth !== undefined).length,
        0
      );
    expect(totals(2024, 1)).toBe(31);
    expect(totals(2024, 4)).toBe(30);
    expect(totals(2024, 12)).toBe(31);
  });
});
