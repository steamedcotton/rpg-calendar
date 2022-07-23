import { isLeapYear, getDateFromEpoch, getDaysInYear, getDaysInMonth, getYearName } from './rules';

describe('Harptos Rules', () => {
  test('checking leap year rule', () => {
    expect(isLeapYear(0)).toBe(true);
    expect(isLeapYear(4)).toBe(true);
    expect(isLeapYear(1380)).toBe(true);
  });

  test('get days in year', () => {
    expect(getDaysInYear(30)).toBe(365);
    expect(getDaysInYear(4)).toBe(366);
    expect(getDaysInYear(1380)).toBe(366);
  });

  test('get days in month', () => {
    expect(getDaysInMonth(1, 0)).toBe(31);
    expect(getDaysInMonth(2, 0)).toBe(30);
    expect(getDaysInMonth(1, 0)).toBe(31);
    expect(getDaysInMonth(7, 4)).toBe(32);
    expect(getDaysInMonth(7, 3)).toBe(31);
  });

  test('get simple date from epoch', () => {
    // Fist day of Year 0
    const year0Date1 = getDateFromEpoch(1);
    expect(year0Date1.year).toBe(0);
    expect(year0Date1.monthOfYear).toBe(1);
    expect(year0Date1.dayOfMonth).toBe(1);
    expect(year0Date1.dayOfYear).toBe(1);

    // Tenth day of Year 0
    const year0Date10 = getDateFromEpoch(10);
    expect(year0Date10.year).toBe(0);
    expect(year0Date10.monthOfYear).toBe(1);
    expect(year0Date10.dayOfMonth).toBe(10);
    expect(year0Date10.dayOfYear).toBe(10);

    // First day of second month (year 0)
    const secondMonthYear0 = getDateFromEpoch(32);
    expect(secondMonthYear0.year).toBe(0);
    expect(secondMonthYear0.monthOfYear).toBe(2);
    expect(secondMonthYear0.dayOfMonth).toBe(1);
    expect(secondMonthYear0.dayOfYear).toBe(32);

    const currentDate = getDateFromEpoch(505991);
    expect(currentDate.year).toBe(1385);
    expect(currentDate.monthOfYear).toBe(4);
    expect(currentDate.dayOfMonth).toBe(28);
    expect(currentDate.dayOfYear).toBe(119);

    // expect(getDateFromEpoch(200)).toBe(0)
    // expect(getDateFromEpoch(365)).toBe(0)
    //
    // expect(getDateFromEpoch(1461)).toBe(3);
    // expect(getDateFromEpoch(1490)).toBe(4);
    // expect(getDateFromEpoch(4393)).toBe(12);
    //
    // expect(getDateFromEpoch(505991)).toBe(1385);
  });

  test('year names', () => {
    expect(getYearName(-560)).toBe('Year of Dreams Attained');
    expect(getYearName(0)).toBe('Year of the Rising Flame');
    expect(getYearName(483)).toBe('Year of the Soaring Galleon');
    expect(getYearName(15000)).toBe('Year of Unknown');
  });
});
