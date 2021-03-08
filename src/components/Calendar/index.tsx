import React, { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
    scheduleItemHeader: {
      height: 25,
      borderBottom: 'dashed 1px #000000',
    },
    scheduleItemContent: {
      height: 100,
    },
  })
);

const Component: FC = () => {
  const classes = useStyles();
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.dayOfTheWeekContainer}>
        {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => {
          return (
            <div className={classes.dayOfTheWeekItem} key={i}>
              <Typography align="center">{day}</Typography>
            </div>
          );
        })}
      </div>

      <div className={classes.scheduleContainer}>
        {range(1, 35, 1).map((i) => {
          return (
            <div className={classes.scheduleItem} key={i}>
              <div className={classes.scheduleItemHeader}>
                <Typography align="center">
                  {(() => {
                    if (i === 1) {
                      return '2月1日';
                    } else if (i === 32) {
                      return '3月1日';
                    } else if (i >= 33) {
                      return i - 31;
                    } else {
                      return i;
                    }
                  })()}
                </Typography>
              </div>
              <div className={classes.scheduleItemContent}>
                {(() => {
                  if (i === 2) {
                    return <Typography>12:00 節分</Typography>;
                  } else {
                    return '';
                  }
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Container: FC = () => {
  return <Component />;
};

export default Container;
