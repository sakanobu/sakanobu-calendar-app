import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const DeleteConfirmDialog: FC = () => {
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
        削除確認ダイアログのテスト
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <ReportProblemIcon />
          削除確認画面
        </DialogTitle>
        <DialogContent>｢~~｣を削除してもよろしいですか?</DialogContent>
        <DialogActions>
          <Button variant="contained">キャンセル</Button>
          <Button variant="contained" color="secondary">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteConfirmDialog;
