import React, { VFC, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const UnsaveConfirmDialog: VFC = () => {
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
        未保存確認ダイアログのテスト
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <ReportProblemIcon />
          内容を破棄しますか?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained">キャンセル</Button>
          <Button color="secondary" variant="contained">
            破棄
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnsaveConfirmDialog;
