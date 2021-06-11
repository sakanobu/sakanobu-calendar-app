import { VFC } from 'react';
import { addMonths, format } from 'date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  CalendarArrayType,
  createCalendarArray,
} from 'services/calendar_array';
import type { ScheduleWithTagAndColor } from 'services/request_schedules';

type Props = {
  schedules: ScheduleWithTagAndColor[];
  selectedDate: Date;
};

const useStyles = makeStyles(() =>
  createStyles({
    scheduleContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    scheduleItem: {
      width: 'calc(100% / 7 - 2px)',
      height: 125,
      borderTop: 'solid 1px #000000',
      borderRight: 'solid 1px #000000',
    },
    scheduleItemNotSelectedMonth: {
      backgroundColor: '#C0C0C0',
      width: 'calc(100% / 7 - 2px)',
      height: 125,
      borderTop: 'solid 1px #000000',
      borderRight: 'solid 1px #000000',
    },
    scheduleItemHeader: {
      height: 25,
      borderBottom: 'dashed 1px #000000',
    },
    scheduleItemContent: {
      height: 100,
    },
  })
);

const displayDate = (
  selectedDay: CalendarArrayType[number],
  _selectedDate: Date
): string => {
  if (selectedDay.day !== '1') {
    return selectedDay.day;
  }
  if (selectedDay.selectedMonth === true) {
    return `${format(_selectedDate, 'M')}月1日`;
  }

  return `${format(addMonths(_selectedDate, 1), 'M')}月1日`;
};

const Schedule: VFC<Props> = ({ schedules, selectedDate }) => {
  const classes = useStyles();

  const calendarArray = createCalendarArray(selectedDate);

  let firstDateCounter = 0;

  return (
    <div className={classes.scheduleContainer}>
      {calendarArray.map((selectedDay) => {
        if (selectedDay.day === '1') {
          firstDateCounter += 1;
        }

        return (
          <div
            key={selectedDay.indexForKey}
            className={
              selectedDay.selectedMonth === true
                ? classes.scheduleItem
                : classes.scheduleItemNotSelectedMonth
            }
          >
            <div className={classes.scheduleItemHeader}>
              <Typography align="center">
                {displayDate(selectedDay, selectedDate)}
              </Typography>
            </div>
            <div className={classes.scheduleItemContent}>
              {firstDateCounter === 1
                ? schedules
                    .filter(
                      (schedule) =>
                        schedule.startTime.toDate().getDate() ===
                        Number(selectedDay.day)
                    )
                    .map((schedule) => (
                      <div key={schedule.title}>
                        {format(schedule.startTime.toDate(), 'HH:mm')}{' '}
                        {schedule.title}
                      </div>
                    ))
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
