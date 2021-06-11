import { memo, VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    dayOfTheWeekContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    dayOfTheWeekItem: {
      width: 'calc(100% / 7 - 2px)',
      borderRight: 'solid 1px #000000',
    },
  })
);

const DayOfTheWeek: VFC = memo(() => {
  const classes = useStyles();

  const dayOfTheWeek = ['日', '月', '火', '水', '木', '金', '土'] as const;

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
    <div className={classes.dayOfTheWeekContainer}>
      {dayOfTheWeek.map((day: typeof dayOfTheWeek[number]) => (
        <div
          key={day}
          className={classes.dayOfTheWeekItem}
          style={calendarBackgroundColor(day)}
        >
          <Typography align="center">{day}</Typography>
        </div>
      ))}
    </div>
  );
});

export default DayOfTheWeek;
