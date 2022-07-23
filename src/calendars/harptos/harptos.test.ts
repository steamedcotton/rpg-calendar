import { Harptos } from './';

// test('harptos date time to epoch', () => {
//   const epoch = dateToEpoch(1491, 2, 10);
//   expect(epoch).toBe(544628);
// });

test('harptos epoch to date time', () => {
  const h = new Harptos();
  const d = h.epochDateToFCDate(10);
  expect(d.year).toBe(0);
  expect(d.dayOfMonth).toBe(10);
  expect(d.monthOfYear).toBe(1);
  // expect(d.year).toBe(1491);
  // expect(d.dayOfMonth).toBe(10);
  // expect(d.monthOfYear).toBe(2);

  // const d2 = h.epochDateToFCDate(505991);
  // expect(d2.year).toBe(1385);
  // expect(d2.dayOfMonth).toBe(29);
  // expect(d2.monthOfYear).toBe(4);
});
//
// test('harptos date time to date time epoch', () => {
//   const epoch = dateTimeToEpoch(1491, 2, 10, 9, 10, 24);
//   expect(epoch).toBe('544628-09:10:24');
// });
//
// test('harptos date time epoch to date time', () => {
//   const dt = epochDateTimeToDate('544628-09:10:24');
//   expect(dt.year).toBe(1491);
//   expect(dt.dayOfMonth).toBe(10);
//   expect(dt.monthOfYear).toBe(2);
//   expect(dt.time.hour).toBe(9);
//   expect(dt.time.minute).toBe(10);
//   expect(dt.time.second).toBe(24);
// });
//
// test('get full calendar for year', () => {
//   const calendarYear = getCalendarForYear(1451);
//
//   console.log(JSON.stringify(calendarYear, null, 3));
//
//   expect(calendarYear.yearName).toBe('Year of Knowledge Unearthed');
// });
