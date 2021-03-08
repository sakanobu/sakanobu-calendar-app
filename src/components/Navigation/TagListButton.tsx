import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddTagDialog from 'components/Dialog/TagListDialog';

export type Props = {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
};

const Component: FC<Props> = (props) => {
  return (
    <>
      <Button variant="contained" onClick={props.handleClickOpen}>
        タグ
      </Button>
      <AddTagDialog open={props.open} handleClose={props.handleClose} />
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
