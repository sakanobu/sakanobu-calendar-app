import React, { VFC } from 'react';
import { addMonths, format, subMonths } from 'date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
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
  selectedDate: Date;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => Promise<Date>;
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

const Navigation: VFC<Props> = ({ addSchedule, tagBoxes }) => {
  const classes = useStyles();

  const { selectedDate, handleChangeSelectedDate } =
    React.useContext(SelectedDateContext);

  const handleClickTodayButton = () => handleChangeSelectedDate(new Date());

  const handleClickLeftIcon = () => {
    handleChangeSelectedDate(subMonths(selectedDate, 1)).catch(() => {
      console.error('Error at AddScheduleButton.tsx');
    });
  };

  const handleClickRightIcon = () => {
    handleChangeSelectedDate(addMonths(selectedDate, 1)).catch(() => {
      console.error('Error at AddScheduleButton.tsx');
    });
  };

  return (
    <AppBar position="static">
      <ToolBar className={classes.toolBar}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleClickTodayButton}
        >
          今日
        </Button>
        <Button
          className={classes.button}
          startIcon={<ChevronLeftIcon />}
          variant="contained"
          onClick={handleClickLeftIcon}
        />
        <Button
          className={classes.button}
          startIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={handleClickRightIcon}
        />
        <Typography align="center" className={classes.dateToday}>
          {`${format(selectedDate, 'yyyy')}年 ${format(selectedDate, 'MM')}月`}
        </Typography>
        <JumpButton
          handleChangeSelectedDate={handleChangeSelectedDate}
          selectedDate={selectedDate}
        />
        <FilterButton />
        <AddTagButton />
        <AddScheduleButton addSchedule={addSchedule} tagBoxes={tagBoxes} />
      </ToolBar>
    </AppBar>
  );
};

export default Navigation;
