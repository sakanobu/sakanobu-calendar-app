import React, { FC } from 'react';
import { addMonths, format, subMonths } from 'date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import JumpButton from 'components/Navigation/JumpButton';
import FilterButton from 'components/Navigation/FilterButton';
import AddTagButton from 'components/Navigation/TagListButton';
import AddScheduleButton from 'components/Navigation/AddScheduleButton';
import { SelectedDateContext } from 'hooks/useSelectedDateContext';
import { UseScheduleType } from 'hooks/useSchedules';
import type { TagBox } from 'hooks/useTags';

type Props = {
  addSchedule: UseScheduleType['addSchedule'];
  tagBoxes: TagBox[];
};

const useStyles = makeStyles(() =>
  createStyles({
    toolBar: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    button: {
      flexShrink: 1,
    },
    dateToday: {
      flexGrow: 3,
    },
  })
);

const Navigation: FC<Props> = (props) => {
  const classes = useStyles();

  const { selectedDate, handleChangeSelectedDate } = React.useContext(
    SelectedDateContext
  );

  const handleClickTodayButton = () => handleChangeSelectedDate(new Date());

  const handleClickLeftIcon = () => {
    handleChangeSelectedDate(subMonths(selectedDate, 1));
  };

  const handleClickRightIcon = () => {
    handleChangeSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <AppBar position="static">
      <ToolBar className={classes.toolBar}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleClickTodayButton}
        >
          今日
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronLeftIcon />}
          onClick={handleClickLeftIcon}
        />
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronRightIcon />}
          onClick={handleClickRightIcon}
        />
        <Typography className={classes.dateToday} align="center">
          {`${format(selectedDate, 'yyyy')}年 ${format(selectedDate, 'MM')}月`}
        </Typography>
        <JumpButton />
        <FilterButton />
        <AddTagButton />
        <AddScheduleButton
          addSchedule={props.addSchedule}
          tagBoxes={props.tagBoxes}
        />
      </ToolBar>
    </AppBar>
  );
};

export default Navigation;
