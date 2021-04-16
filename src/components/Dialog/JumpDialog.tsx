import React, { FC } from 'react';
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
  handleClose: () => void;
};

const JumpDialog: FC<Props> = (props) => {
  const { selectedDate, handleChangeSelectedDate } = React.useContext(
    SelectedDateContext
  );

  const handleChange = async (date: MaterialUiPickersDate) => {
    await handleChangeSelectedDate(date);
    await props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>指定した年月にジャンプ</DialogTitle>
      <DialogContent>
        <DatePicker
          label="○年○月"
          format="yyyy/MM"
          openTo="year"
          views={['year', 'month']}
          value={selectedDate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={props.handleClose}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JumpDialog;
