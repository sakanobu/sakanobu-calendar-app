import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddScheduleDialog from 'components/Dialog/AddScheduleDialog';
import type { UseScheduleType } from 'hooks/useSchedules';
import type { TagBox } from 'hooks/useTags';

type Props = {
  addSchedule: UseScheduleType['addSchedule'];
  tagBoxes: TagBox[];
};

const AddScheduleButton: FC<Props> = React.memo<Props>((props) => {
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
        +予定
      </Button>
      <AddScheduleDialog
        addSchedule={props.addSchedule}
        handleClose={handleClose}
        open={open}
        tagBoxes={props.tagBoxes}
      />
    </>
  );
});

AddScheduleButton.displayName = 'AddScheduleButton';

export default AddScheduleButton;
