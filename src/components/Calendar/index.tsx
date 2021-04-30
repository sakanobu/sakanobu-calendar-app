import React, { FC } from 'react';
import { addMonths, format } from 'date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SelectedDateContext } from 'hooks/useSelectedDateContext';
import type { ScheduleWithUserTagColor } from 'services/request_schedules';
import {
  CalendarArrayType,
  createCalendarArray,
} from 'services/calendar_array';

type Props = {
  schedules: ScheduleWithUserTagColor[];
};

const useStyles = makeStyles(() =>
  createStyles({
    calendarContainer: {
      marginTop: 30,
      border: 'solid 1px #000000',
    },
    dayOfTheWeekContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    dayOfTheWeekItem: {
      width: 'calc(100% / 7 - 2px)',
      borderRight: 'solid 1px #000000',
    },
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

const Calendar: FC<Props> = (props) => {
  const classes = useStyles();

  const { selectedDate } = React.useContext(SelectedDateContext);

  const calendarArray = createCalendarArray(selectedDate);

  let firstDateCounter = 0;

  const displayDate = (
    selectedDay: CalendarArrayType[number],
    selectedDate: Date
  ): string => {
    if (selectedDay.day !== '1') {
      return selectedDay.day;
    } else if (selectedDay.selectedMonth === true) {
      return `${format(selectedDate, 'M')}月1日`;
    } else {
      return `${format(addMonths(selectedDate, 1), 'M')}月1日`;
    }
  };

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.dayOfTheWeekContainer}>
        {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => {
          return (
            <div
              className={classes.dayOfTheWeekItem}
              style={
                day === '日'
                  ? { backgroundColor: '#FFAD90' }
                  : day === '土'
                  ? { backgroundColor: '#BAD3FF' }
                  : { backgroundColor: '#FFFFEE' }
              }
              key={i}
            >
              <Typography align="center">{day}</Typography>
            </div>
          );
        })}
      </div>

      <div className={classes.scheduleContainer}>
        {calendarArray.map((selectedDay) => {
          if (selectedDay.day === '1') {
            firstDateCounter += 1;
          }

          return (
            <div
              className={
                selectedDay.selectedMonth === true
                  ? classes.scheduleItem
                  : classes.scheduleItemNotSelectedMonth
              }
              key={selectedDay.indexForKey}
            >
              <div className={classes.scheduleItemHeader}>
                <Typography align="center">
                  {displayDate(selectedDay, selectedDate)}
                </Typography>
              </div>
              <div className={classes.scheduleItemContent}>
                {firstDateCounter === 1
                  ? props.schedules
                      .filter((schedule) => {
                        return (
                          schedule.startTime.toDate().getDate() ===
                          Number(selectedDay.day)
                        );
                      })
                      .map((schedule) => {
                        return (
                          <div key={schedule.title}>
                            {format(schedule.startTime.toDate(), 'HH:mm')}{' '}
                            {schedule.title}
                          </div>
                        );
                      })
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
