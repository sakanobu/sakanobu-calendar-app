import { createCalendarArray } from './calendar_array';

const expected = [
  '28',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '1',
  '2',
  '3',
].map((day: string, i: number) => {
  return {
    day,
    indexForKey: i,
    selectedMonth: i >= 1 && i <= 31 ? true : false,
  };
});

describe('createCalendarArray', () => {
  it('2021/03 calendar', () => {
    const result = createCalendarArray(new Date(2021, 2));
    expect(result).toStrictEqual(expected);
  });
});
