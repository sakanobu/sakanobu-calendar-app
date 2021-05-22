import React, { FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import { colors } from 'data';

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexFlow: 'column',
    },
  })
);

const EditTagDialog: FC = () => {
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
        タグ編集ダイアログのテスト
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>タグの編集</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="タグ名" variant="outlined" />
          <FormControl>
            <InputLabel shrink htmlFor="color">
              タグ
            </InputLabel>
            <NativeSelect
              inputProps={{ name: 'color', id: 'color' }}
              value="aaa"
              onChange={() => console.log(1)}
            >
              {colors.map((color) => (
                <>
                  <option key={color.colorID} value={color.colorName}>
                    {color.colorName}
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

export default EditTagDialog;
