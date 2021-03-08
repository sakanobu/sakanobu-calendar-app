import React, { FC } from 'react';
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

const Component: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <ToolBar className={classes.toolBar}>
        <Button variant="contained" className={classes.button}>
          今日
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronLeftIcon />}
        />
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<ChevronRightIcon />}
        />
        <Typography className={classes.dateToday} align="center">
          2021年 02月
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
  return <Component />;
};

export default Container;
