import React, { FC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { tags } from 'data';

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexFlow: 'column',
    },
  })
);

const EditScheduleDialog: FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        スケジュール編集ダイアログのテスト
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>予定の編集</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="予定" size="small" variant="outlined" />
          <DatePicker
            format="yyyy/MM/dd"
            label="日付"
            openTo="year"
            value={new Date()}
            views={['year', 'month', 'date']}
            onChange={() => console.log(1)}
          />
          <TimePicker
            label="開始時間"
            value={new Date()}
            onChange={() => console.log(1)}
          />
          <FormControl>
            <InputLabel shrink htmlFor="tag">
              タグ
            </InputLabel>
            <NativeSelect
              inputProps={{ name: 'tag', id: 'tag' }}
              value="aaa"
              onChange={() => console.log(1)}
            >
              {tags.map((tag) => (
                <>
                  <option key={tag.tagID} value={tag.tagName}>
                    {tag.tagName}
                  </option>
                </>
              ))}
            </NativeSelect>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">キャンセル</Button>
          <Button color="primary" variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditScheduleDialog;
