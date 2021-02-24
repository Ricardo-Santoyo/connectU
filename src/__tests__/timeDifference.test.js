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
  expect(timeDifference(date1)).toBe('Feb 20');
});

test('returns mm/dd/yyyy if time difference is greater than 1 year', () => {
  const date1 = new Date() - 37324800000
  expect(timeDifference(date1)).toBe('Dec 19, 2019');
});