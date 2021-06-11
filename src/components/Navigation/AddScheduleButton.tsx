import React, { VFC, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddScheduleDialog from 'components/Navigation/AddScheduleDialog';
import type { UseScheduleType } from 'hooks/useSchedules';
import type { TagBox } from 'hooks/useTags';

type Props = {
  addSchedule: UseScheduleType['addSchedule'];
  tagBoxes: TagBox[];
};

const AddScheduleButton: VFC<Props> = React.memo<Props>(
  ({ addSchedule, tagBoxes }) => {
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
          addSchedule={addSchedule}
          handleClose={handleClose}
          open={open}
          tagBoxes={tagBoxes}
        />
      </>
    );
  }
);

AddScheduleButton.displayName = 'AddScheduleButton';

export default AddScheduleButton;
