import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import JumpDialog from 'components/Dialog/JumpDialog';

const JumpButton: FC = React.memo(() => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = React.useCallback(() => {
  //   setOpen(false);
  // }, []);

  const handleClose = React.useCallback(async (): Promise<void> => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        ジャンプ
      </Button>
      <JumpDialog handleClose={handleClose} open={open} />
    </>
  );
});

JumpButton.displayName = 'JumpButton';

export default JumpButton;
