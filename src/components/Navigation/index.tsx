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
import { SelectedDateContext } from 'App';

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

type Props = {
  selectedDate: Date;
  handleClickTodayButton: () => void;
  handleClickLeftIcon: () => void;
  handleClickRightIcon: () => void;
};

const Component: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <ToolBar className={classes.toolBar}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            props.handleClickTodayButton();
          }}
        >
          今日
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronLeftIcon />}
          onClick={() => {
            props.handleClickLeftIcon();
          }}
        />
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronRightIcon />}
          onClick={() => {
            props.handleClickRightIcon();
          }}
        />
        <Typography className={classes.dateToday} align="center">
          {`${format(props.selectedDate, 'yyyy')}年 ${format(
            props.selectedDate,
            'MM'
          )}月`}
        </Typography>
        <JumpButton />
        <FilterButton />
        <AddTagButton />
        <AddScheduleButton />
      </ToolBar>
    </AppBar>
  );
};

const Container: FC = () => {
  const { selectedDate, handleChangeSelectedDate } = React.useContext(
    SelectedDateContext
  );

  const handleClickTodayButton = () => ~handleChangeSelectedDate(new Date());

  const handleClickLeftIcon = () => {
    handleChangeSelectedDate(subMonths(selectedDate, 1));
  };

  const handleClickRightIcon = () => {
    handleChangeSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <Component
      selectedDate={selectedDate}
      handleClickTodayButton={handleClickTodayButton}
      handleClickLeftIcon={handleClickLeftIcon}
      handleClickRightIcon={handleClickRightIcon}
    />
  );
};

export default Container;
