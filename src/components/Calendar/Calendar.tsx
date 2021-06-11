import React, { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import type { ScheduleWithUserTagColor } from 'services/request_schedules';
import DayOfTheWeek from 'components/Calendar/DayOfTheWeek';
import Schedule from 'components/Calendar/Schedule';

type Props = {
  schedules: ScheduleWithUserTagColor[];
  selectedDate: Date;
};

const useStyles = makeStyles(() =>
  createStyles({
    calendarContainer: {
      marginTop: 30,
      border: 'solid 1px #000000',
    },
  })
);

const Calendar: VFC<Props> = ({ schedules, selectedDate }) => {
  const classes = useStyles();

  return (
    <div className={classes.calendarContainer}>
      <DayOfTheWeek />
      <Schedule schedules={schedules} selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
