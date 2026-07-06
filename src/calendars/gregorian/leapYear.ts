// Gregorian leap-year rule: divisible by 4, except centuries unless divisible by 400.
export const gregorianIsLeapYear = (year: number): boolean => {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
};
