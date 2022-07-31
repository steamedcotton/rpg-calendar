export const isLeapYearBuilder =
  (interval: number, hasYear0 = false) =>
  (year: number): boolean => {
    if (!hasYear0 && year === 0) {
      throw new Error('Invalid year');
    }

    // Every <interval> years after the first year there is a leap year
    return year % interval === 0;
  };
