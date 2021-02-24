import timeDifference from '../helperFunctions/timeDifference';

test('returns seconds if time difference is less than 60 seconds', () => {
  const date1 = new Date() - 15000
  expect(timeDifference(date1)).toBe('15s');
});

test('returns minutes if time difference is less than 60 minutes', () => {
  const date1 = new Date() - 2040000
  expect(timeDifference(date1)).toBe('34m');
});

test('returns hours if time difference is less than 24 hours', () => {
  const date1 = new Date() - 61200000
  expect(timeDifference(date1)).toBe('17h');
});

test('returns mm/dd if time difference is less than 1 year', () => {
  const date1 = new Date() - 259200000
  expect(timeDifference(date1)).toBe('Feb 21');
});

test('returns mm/dd/yyyy if time difference is greater than 1 year', () => {
  const date1 = new Date() - 37324800000
  expect(timeDifference(date1)).toBe('Dec 20, 2019');
});

test('returns full date if specified(1)', () => {
  const date1 = 1576790030000
  expect(timeDifference(date1, true)).toBe('3:13 PM · Dec 19, 2019');
});

test('returns full date if specified(2)', () => {
  const date1 = 1576754270000
  expect(timeDifference(date1, true)).toBe('5:17 AM · Dec 19, 2019');
});