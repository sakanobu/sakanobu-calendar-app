import React, { VFC } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from '@material-ui/pickers';
import { SelectedDateContext } from 'hooks/useSelectedDateContext';

type Props = {
  open: boolean;
  handleClose: () => Promise<void>;
  selectedDate: Date;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => Promise<Date>;
};

const JumpDialog: VFC<Props> = ({ open, handleClose }) => {
  const { selectedDate, handleChangeSelectedDate } =
    React.useContext(SelectedDateContext);

  const handleChange = async (date: MaterialUiPickersDate) => {
    await handleChangeSelectedDate(date);
    await handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>指定した年月にジャンプ</DialogTitle>
      <DialogContent>
        <DatePicker
          format="yyyy/MM"
          label="○年○月"
          openTo="year"
          value={selectedDate}
          views={['year', 'month']}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="contained" onClick={handleClose}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JumpDialog;
