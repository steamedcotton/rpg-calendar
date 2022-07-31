import { getYearNameBuilder } from './yearName';

describe('Year names', () => {
  test('checking a few year names', () => {
    const yearNameMap: Record<string, string> = {
      '-501': 'The Before Times',
      '1977': 'StarWars',
      '2000': 'Y2K'
    };
    const getYearName = getYearNameBuilder(yearNameMap);

    expect(getYearName(1977)).toBe('Year of StarWars');
    expect(getYearName(2000)).toBe('Year of Y2K');
    expect(getYearName(2001)).toBe('Year of 2001');
    expect(getYearName(-501)).toBe('Year of The Before Times');
  });
});
