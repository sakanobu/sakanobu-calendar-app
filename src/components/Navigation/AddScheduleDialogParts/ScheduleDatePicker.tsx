import React, { VFC } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { DatePicker } from '@material-ui/pickers';

type Props = {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
};

const ScheduleDate: VFC<Props> = React.memo<Props>(
  ({ selectedDate, setSelectedDate }) => {
    const handleDateInput = React.useCallback(
      (date) => {
        setSelectedDate(date);
      },
      [setSelectedDate]
    );

    return (
      <DatePicker
        format="yyyy/MM/dd"
        label="日付"
        openTo="year"
        value={selectedDate}
        views={['year', 'month', 'date']}
        onChange={handleDateInput}
      />
    );
  }
);

ScheduleDate.displayName = 'ScheduleDate';

export default ScheduleDate;
