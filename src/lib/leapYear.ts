export const isLeapYearBuilder =
  (
    interval: number,
    hasYear0 = false,
    override?: (year: number, hasYear0?: boolean) => boolean
  ) =>
  (year: number): boolean => {
    if (!hasYear0 && year === 0) {
      throw new Error('Invalid year');
    }

    if (override) {
      return override(year, hasYear0);
    }

    // Every <interval> years after the first year there is a leap year
    return year % interval === 0;
  };
