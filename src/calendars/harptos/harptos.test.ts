import { monthsWithExtraDays } from './monthsWithExtraDays';
import { monthsWithExtraMonths } from './monthsWithExtraMonths';
import { Calendar } from '../../Calendar';

describe('Harptos calendar', () => {
  test('harptos epoch to date time - extra days', () => {
    const h = new Calendar(monthsWithExtraDays);
    const d = h.epochToDate(10);
    expect(d.year).toBe(0);
    expect(d.dayOfMonth).toBe(10);
    expect(d.monthOfYear).toBe(1);
    expect(d.time.hour).toBe(0);
    expect(d.time.minute).toBe(0);
    expect(d.time.second).toBe(0);
  });

  test('harptos epoch to date time - extra months', () => {
    const h = new Calendar(monthsWithExtraMonths);
    const d = h.epochToDate(10);
    expect(d.year).toBe(0);
    expect(d.dayOfMonth).toBe(10);
    expect(d.monthOfYear).toBe(1);
    expect(d.time.hour).toBe(0);
    expect(d.time.minute).toBe(0);
    expect(d.time.second).toBe(0);
  });

  test('get simple date from epoch', () => {
    const h = new Calendar(monthsWithExtraDays);

    // Fist day of Year 0
    const year0Date1 = h.epochToDate(1);
    expect(year0Date1.year).toBe(0);
    expect(year0Date1.monthOfYear).toBe(1);
    expect(year0Date1.dayOfMonth).toBe(1);
    expect(year0Date1.dayOfYear).toBe(1);

    // Tenth day of Year 0
    const year0Date10 = h.epochToDate(10);
    expect(year0Date10.year).toBe(0);
    expect(year0Date10.monthOfYear).toBe(1);
    expect(year0Date10.dayOfMonth).toBe(10);
    expect(year0Date10.dayOfYear).toBe(10);

    // First day of second month (year 0)
    const secondMonthYear0 = h.epochToDate(32);
    expect(secondMonthYear0.year).toBe(0);
    expect(secondMonthYear0.monthOfYear).toBe(2);
    expect(secondMonthYear0.dayOfMonth).toBe(1);
    expect(secondMonthYear0.dayOfYear).toBe(32);

    const currentDate = h.epochToDate(505991);
    expect(currentDate.year).toBe(1385);
    expect(currentDate.monthOfYear).toBe(4);
    expect(currentDate.dayOfMonth).toBe(28);
    expect(currentDate.dayOfYear).toBe(119);
  });

  test('with time', () => {
    const h = new Calendar(monthsWithExtraDays);
    const d = h.epochToDate('500-11:57:30');
    expect(d.year).toBe(1);
    expect(d.time.hour).toBe(11);
    expect(d.time.minute).toBe(57);
    expect(d.time.second).toBe(30);
  });

  test('year names', () => {
    const h = new Calendar(monthsWithExtraDays);
    // TODO: Enable test when negative years are supported/working
    // expect(h.epochToDate(-560).yearName).toBe('Year of Dreams Attained');
    expect(h.createDate(0).yearName).toBe('Year of the Rising Flame');
    expect(h.createDate(483).yearName).toBe('Year of the Soaring Galleon');
    expect(h.createDate(15000).yearName).toBe('Year of 15000');
  });

  test('year 0 should be a leap year', () => {
    const h = new Calendar(monthsWithExtraDays);
    expect(h.createDate(0).inLeapYear).toBe(true);
  });

  test('converting date time string to date object', () => {
    const h = new Calendar(monthsWithExtraDays);
    const d = h.dateStringToRPGDate('1345-02-05 11:37:09');
    expect(d.year).toBe(1345);
    expect(d.dayOfMonth).toBe(5);
    expect(d.monthOfYear).toBe(2);
    expect(d.dayOfWeek).toBe(5);
    expect(d.time.hour).toBe(11);
    expect(d.time.minute).toBe(37);
    expect(d.time.second).toBe(9);
  });
  // TODO: Add many more tests for edge cases (leap year, after first month, etc)

  test('getting a calendar month to display (Extra Days)', () => {
    const h = new Calendar(monthsWithExtraDays);
    const md = h.getDisplayMonth(100, 1);

    expect(md.weeks.length).toBe(4);
    expect(md.weeks[0].length).toBe(10);
    expect(md.weeks[1].length).toBe(10);
    expect(md.weeks[2].length).toBe(10);
    expect(md.weeks[3].length).toBe(1);

    expect(md.prevMonthQuery.month).toBe(12);
    expect(md.prevMonthQuery.year).toBe(99);
    expect(md.nextMonthQuery.month).toBe(2);
    expect(md.nextMonthQuery.year).toBe(100);
  });

  test('getting a calendar month to display (Extra Months)', () => {
    const h = new Calendar(monthsWithExtraMonths);
    const md = h.getDisplayMonth(100, 1);

    expect(md.weeks.length).toBe(3);
    expect(md.weeks[0].length).toBe(10);
    expect(md.weeks[1].length).toBe(10);
    expect(md.weeks[2].length).toBe(10);
    expect(md.weeks?.[3]).toBeUndefined(); // No third week, because extra days are put into extra months

    expect(md.prevMonthQuery.month).toBe(17);
    expect(md.prevMonthQuery.year).toBe(99);
    expect(md.nextMonthQuery.month).toBe(2);
    expect(md.nextMonthQuery.year).toBe(100);
  });
});
