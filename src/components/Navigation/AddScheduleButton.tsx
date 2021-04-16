import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddScheduleDialog from 'components/Dialog/AddScheduleDialog';

const AddScheduleButton: FC = () => {
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
        +予定
      </Button>
      <AddScheduleDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default AddScheduleButton;
