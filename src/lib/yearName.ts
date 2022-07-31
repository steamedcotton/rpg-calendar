export const getYearNameBuilder = (yearNameMap: Record<string, string>) => (year: number) => {
  const yearKey = year.toString(10);
  return `Year of ${yearNameMap?.[yearKey] || yearKey}`;
};
