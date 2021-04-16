import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import FilterDialog from 'components/Dialog/FilterDialog';

const FilterButton: FC = () => {
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
        フィルター
      </Button>
      <FilterDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default FilterButton;
