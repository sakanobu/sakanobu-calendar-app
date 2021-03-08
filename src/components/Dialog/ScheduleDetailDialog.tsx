/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { schedules } from 'data';

type Props = {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexFlow: 'column',
    },
  })
);

const Component: FC<Props> = (props) => {
  const classes = useStyles();
  const schedule = schedules[0];

  return (
    <>
      <Button variant="contained" onClick={props.handleClickOpen}>
        予定詳細ダイアログのテスト
      </Button>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll="paper"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={8}>
              {'◯'}月{'△'}日の予定詳細
            </Grid>
            <Grid item xs={2}>
              <IconButton color="inherit" edge="end">
                <CreateIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton color="secondary" edge="end">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          <List>
            <ListItem divider>
              <ListItemText>予定: {schedule!.scheduleName}</ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemText>
                日付: {format(schedule!.date, 'yyyy/MM/dd')}
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemText>
                {`時間: ${format(schedule!.date, 'HH:mm')} ~ ${format(
                  schedule!.date,
                  'HH:mm'
                )}`}
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemText>タグ: 仕事</ListItemText>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Container: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Component
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
    />
  );
};

export default Container;
