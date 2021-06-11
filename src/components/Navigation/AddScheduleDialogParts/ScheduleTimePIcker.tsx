import React, { VFC } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { TimePicker } from '@material-ui/pickers';

type Props = {
  selectedStartTime: Date | null;
  setSelectedStartTime: Dispatch<SetStateAction<Date | null>>;
};

const ScheduleTimePicker: VFC<Props> = React.memo<Props>(
  ({ selectedStartTime, setSelectedStartTime }) => {
    const handleStartTimeInput = React.useCallback(
      (date) => {
        setSelectedStartTime(date);
      },
      [setSelectedStartTime]
    );

    return (
      <TimePicker
        label="開始時間"
        value={selectedStartTime}
        onChange={handleStartTimeInput}
      />
    );
  }
);

ScheduleTimePicker.displayName = 'ScheduleTimePicker';

export default ScheduleTimePicker;
