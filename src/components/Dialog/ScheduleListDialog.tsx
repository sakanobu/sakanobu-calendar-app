import React, { VFC, useState } from 'react';
import format from 'date-fns/format';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { schedules } from 'data';

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexFlow: 'column',
    },
  })
);

const ScheduleListDialog: VFC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO useRefの意図をコメントで書いておく
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  // TODO useEffectってここにいていいのか?
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        ◯月△日の全予定ダイアログのテスト
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitle>◯月△日の全予定</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <List>
              {schedules.map((schedule) => (
                <>
                  <ListItem key={schedule.scheduleID} button divider>
                    <ListItemText>
                      {format(schedule.startTime, 'kk:mm')}
                    </ListItemText>
                    <ListItemText>{schedule.scheduleName}</ListItemText>
                  </ListItem>
                </>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduleListDialog;
