import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

type Props = {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
};

const Component: FC<Props> = (props) => {
  return (
    <>
      <Button variant="contained" onClick={props.handleClickOpen}>
        未保存確認ダイアログのテスト
      </Button>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>
          <ReportProblemIcon />
          内容を破棄しますか?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained">キャンセル</Button>
          <Button variant="contained" color="secondary">
            破棄
          </Button>
        </DialogActions>
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
