import React, { VFC, useState } from 'react';
import Button from '@material-ui/core/Button';
import FilterDialog from 'components/Navigation/FilterDialog';

const FilterButton: VFC = React.memo(() => {
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
        フィルター
      </Button>
      <FilterDialog handleClose={handleClose} open={open} />
    </>
  );
});

FilterButton.displayName = 'FilterButton';

export default FilterButton;
