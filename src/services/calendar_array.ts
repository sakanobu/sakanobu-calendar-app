import { format, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns';

type Day = 'Su' | 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa';

/**
 * 日曜日を起点とし､0と割り当てている
 */
type IndexOfDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarArrayType = {
  day: string;
  indexForKey: number;
  selectedMonth: boolean;
}[];

const dayOfweek: Record<Day, IndexOfDay> = {
  Su: 0,
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6,
};

const isDay = (formattedValue: string): formattedValue is Day =>
  formattedValue in dayOfweek;

const isIndexOfDay = (computedValue: number): computedValue is IndexOfDay =>
  computedValue in Object.values(dayOfweek);

/**
 * 指定した年月の初日よりも前に表示される前月の日付の個数を算出する
 * @param {Date} firstDateOfSelectedDate 指定した年月の初日のDateオブジェクト
 * @returns {IndexOfDay} 0~6の整数
 */
const numberOfDisplayedBeforeMonthDates = (
  firstDateOfSelectedDate: Date
): IndexOfDay => {
  if (firstDateOfSelectedDate === null) {
    throw new Error('nullです');
  }

  const formattedValue = format(firstDateOfSelectedDate, 'cccccc');
  if (isDay(formattedValue)) {
    const computedValue = dayOfweek[formattedValue];
    if (isIndexOfDay(computedValue)) {
      return computedValue;
    }
  }
  throw new Error('date-fnsのformat()が失敗してます');
};

/**
 * 指定した年月の最終日よりも後に表示される来月の日付の個数を算出する
 * @param {Date} lastDateOfSelectedDate 指定した年月の最終日のDateオブジェクト
 * @returns {IndexOfDay} 0~6の整数
 */
const numberOfDisplayedAfterMonthDates = (
  lastDateOfSelectedDate: Date
): IndexOfDay => {
  if (lastDateOfSelectedDate === null) {
    throw new Error('nullです');
  }

  const formattedValue = format(lastDateOfSelectedDate, 'cccccc');
  if (isDay(formattedValue)) {
    const computedValue = 6 - dayOfweek[formattedValue];
    if (isIndexOfDay(computedValue)) {
      return computedValue;
    }
  }
  throw new Error('date-fnsのformat()が失敗してます');
};

/**
 * カレンダーで表示される日付の先月の部分を要素とした配列を作成する
 * カレンダーの日付の配列を作成する他の2つの関数とともに使用される
 * @param {Date} firstDateOfSelectedDate 指定した年月の最終日のDateオブジェクト
 * @param {Date} lastDateOfBeforeSelectedMonth してした年月の1つ前の月の初日のDateオブジェクト
 * @returns {CalendarArrayType} 表示するカレンダーの日付の一部分を格納した配列
 */
const createCalendarArrayPartsBeforeSelectedMonth = (
  firstDateOfSelectedDate: Date,
  lastDateOfBeforeSelectedMonth: Date
): CalendarArrayType =>
  Array.from({
    length: numberOfDisplayedBeforeMonthDates(firstDateOfSelectedDate),
  }).map((_, i) => ({
    day: String(
      Number(format(lastDateOfBeforeSelectedMonth, 'dd')) -
        numberOfDisplayedBeforeMonthDates(firstDateOfSelectedDate) +
        1 +
        i
    ),
    indexForKey: i,
    selectedMonth: false,
  }));

/**
 * カレンダーで表示される日付の指定した月の部分を要素とした配列を作成する
 * カレンダーの日付の配列を作成する他の2つの関数とともに使用される
 * @param firstDateOfSelectedDate 指定した年月の初日のDateオブジェクト
 * @param lastDateOfSelectedDate 指定した年月の最終日のDateオブジェクト
 * @returns 表示するカレンダーの日付の一部分を格納した配列
 */
const createCalendarArrayPartsSelectedMonth = (
  firstDateOfSelectedDate: Date,
  lastDateOfSelectedDate: Date
): CalendarArrayType =>
  Array.from({
    length: Number(format(lastDateOfSelectedDate, 'dd')),
  }).map((_, i) => ({
    day: String(i + 1),
    indexForKey: numberOfDisplayedBeforeMonthDates(firstDateOfSelectedDate) + i,
    selectedMonth: true,
  }));

/**
 * カレンダーで表示される日付の来月の部分を要素とした配列を作成する
 * カレンダーの日付の配列を作成する他の2つの関数とともに使用される
 * @param firstDateOfSelectedDate 指定した年月の初日のDateオブジェクト
 * @param lastDateOfSelectedDate 指定した年月の最終日のDateオブジェクト
 * @returns 表示するカレンダーの日付の一部分を格納した配列
 */
const createCalendarArrayPartsAfterSelectedMonth = (
  firstDateOfSelectedDate: Date,
  lastDateOfSelectedDate: Date
): CalendarArrayType =>
  Array.from({
    length: numberOfDisplayedAfterMonthDates(lastDateOfSelectedDate),
  }).map((_, i) => ({
    day: String(i + 1),
    indexForKey:
      numberOfDisplayedBeforeMonthDates(firstDateOfSelectedDate) +
      Number(format(lastDateOfSelectedDate, 'dd')) +
      i,
    selectedMonth: false,
  }));

/**
 * 指定した月およびその前後の月の週の日にちの一部も含んだ日付の配列を返す関数
 * @param {Date} selectedDate setSelectedDate()によって変更されたstate
 * @returns {string[]} Reactのコンポーネント内でmapで回される配列
 */
export const createCalendarArray = (selectedDate: Date): CalendarArrayType => {
  const firstDateOfSelectedDate = startOfMonth(selectedDate);
  const lastDateOfSelectedDate = lastDayOfMonth(selectedDate);
  const lastDateOfBeforeSelectedMonth = lastDayOfMonth(
    subMonths(firstDateOfSelectedDate, 1)
  );

  return Array.of(
    ...createCalendarArrayPartsBeforeSelectedMonth(
      firstDateOfSelectedDate,
      lastDateOfBeforeSelectedMonth
    ),
    ...createCalendarArrayPartsSelectedMonth(
      firstDateOfSelectedDate,
      lastDateOfSelectedDate
    ),
    ...createCalendarArrayPartsAfterSelectedMonth(
      firstDateOfSelectedDate,
      lastDateOfSelectedDate
    )
  );
};
