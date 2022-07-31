import { extraDays } from './extraDays';
import { extraMonths } from './extraMonths';
import { Calendar } from '../../Calendar';

describe('Harptos calendar', () => {
  test('harptos epoch to date time - extra days', () => {
    const h = new Calendar(extraDays);
    const d = h.epochToDate(10);
    expect(d.year).toBe(0);
    expect(d.dayOfMonth).toBe(10);
    expect(d.monthOfYear).toBe(1);
    expect(d.time.hour).toBe(0);
    expect(d.time.minute).toBe(0);
    expect(d.time.second).toBe(0);
  });

  test('harptos epoch to date time - extra months', () => {
    const h = new Calendar(extraMonths);
    const d = h.epochToDate(10);
    expect(d.year).toBe(0);
    expect(d.dayOfMonth).toBe(10);
    expect(d.monthOfYear).toBe(1);
    expect(d.time.hour).toBe(0);
    expect(d.time.minute).toBe(0);
    expect(d.time.second).toBe(0);
  });

  test('get simple date from epoch', () => {
    const h = new Calendar(extraDays);

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
    const h = new Calendar(extraDays);
    const d = h.epochToDate('500-11:57:30');
    expect(d.year).toBe(1);
    expect(d.time.hour).toBe(11);
    expect(d.time.minute).toBe(57);
    expect(d.time.second).toBe(30);
  });

  test('year names', () => {
    const h = new Calendar(extraDays);
    // TODO: Enable test when negative years are supported/working
    // expect(h.epochToDate(-560).yearName).toBe('Year of Dreams Attained');
    expect(h.createDate(0).yearName).toBe('Year of the Rising Flame');
    expect(h.createDate(483).yearName).toBe('Year of the Soaring Galleon');
    expect(h.createDate(15000).yearName).toBe('Year of 15000');
  });

  // TODO: Add many more tests for edge cases (leap year, after first month, etc)
});
