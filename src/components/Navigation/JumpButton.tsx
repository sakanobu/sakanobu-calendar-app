import React, { VFC, useState } from 'react';
import Button from '@material-ui/core/Button';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import JumpDialog from 'components/Navigation/JumpDialog';

type Props = {
  selectedDate: Date;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => Promise<Date>;
};

const JumpButton: VFC<Props> = React.memo(
  ({ handleChangeSelectedDate, selectedDate }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = React.useCallback(async (): Promise<void> => {
      setOpen(false);
    }, []);

    return (
      <>
        <Button variant="contained" onClick={handleClickOpen}>
          ジャンプ
        </Button>
        <JumpDialog
          handleChangeSelectedDate={handleChangeSelectedDate}
          handleClose={handleClose}
          open={open}
          selectedDate={selectedDate}
        />
      </>
    );
  }
);

JumpButton.displayName = 'JumpButton';

export default JumpButton;
