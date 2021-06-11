import React, { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    calendarContainer: {
      marginTop: 30,
      border: 'solid 1px #000000',
    },
  })
);

const Calendar: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.calendarContainer}>{children}</div>;
};

export default Calendar;
