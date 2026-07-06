import { isLeapYearBuilder } from './leapYear';

describe('Leap Year override', () => {
  test('override function wins over interval', () => {
    const isLeap = isLeapYearBuilder(4, true, (year) => year === 100);
    expect(isLeap(4)).toBe(false); // interval would say true, but override says only 100
    expect(isLeap(100)).toBe(true);
  });

  test('override receives hasYear0 flag', () => {
    let received: boolean | undefined;
    const isLeap = isLeapYearBuilder(0, true, (_year, hasYear0) => {
      received = hasYear0;
      return true;
    });
    isLeap(5);
    expect(received).toBe(true);
  });

  test('year 0 still throws when hasYear0 is false, even with override', () => {
    const isLeap = isLeapYearBuilder(0, false, () => true);
    expect(() => isLeap(0)).toThrow('Invalid year');
  });
});
