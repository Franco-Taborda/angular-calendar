import { DayOfWeekNamePipe } from './day-of-week-name.pipe';

describe('DayOfWeekNamePipe', () => {
  it('should return the selected weekday name abreviated', () => {
    const pipe = new DayOfWeekNamePipe();
    const weekDay = 6;
    const expected = 'Saturday';
    expect(pipe.transform(weekDay)).toBe(expected);
  });
});
