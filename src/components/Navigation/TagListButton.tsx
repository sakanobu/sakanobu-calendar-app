import React, { VFC, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddTagDialog from 'components/Dialog/TagListDialog';

const TagListButton: VFC = React.memo(() => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        タグ
      </Button>
      <AddTagDialog handleClose={handleClose} open={open} />
    </>
  );
});

TagListButton.displayName = 'TagListButton';

export default TagListButton;
