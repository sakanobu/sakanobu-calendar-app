import React, { VFC } from 'react';
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

const Calendar: VFC<Props> = (props) => {
  const classes = useStyles();

  const { selectedDate } = React.useContext(SelectedDateContext);

  const calendarArray = createCalendarArray(selectedDate);

  let firstDateCounter = 0;

  const dayOfTheWeek = ['日', '月', '火', '水', '木', '金', '土'] as const;

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

  const calendarBackgroundColor = (day: typeof dayOfTheWeek[number]) => {
    switch (day) {
      case '日':
        return { backgroundColor: '#FFAD90' };
      case '土':
        return { backgroundColor: '#BAD3FF' };
      default:
        return { backgroundColor: '#FFFFEE' };
    }
  };

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.dayOfTheWeekContainer}>
        {/* {['日', '月', '火', '水', '木', '金', '土'].map( */}
        {dayOfTheWeek.map((day: typeof dayOfTheWeek[number]) => (
          <div
            key={day}
            // style={
            //   day === '日'
            //     ? { backgroundColor: '#FFAD90' }
            //     : day === '土'
            //     ? { backgroundColor: '#BAD3FF' }
            //     : { backgroundColor: '#FFFFEE' }
            // }
            className={classes.dayOfTheWeekItem}
            // key={i}
            style={calendarBackgroundColor(day)}
          >
            <Typography align="center">{day}</Typography>
          </div>
        ))}
      </div>

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
                  ? props.schedules
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
    </div>
  );
};

export default Calendar;
