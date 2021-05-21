import React from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type SelectedDateContextType = {
  selectedDate: Date;
  // handleChangeSelectedDate: (date: MaterialUiPickersDate) => void;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => Promise<Date>;
};

export const SelectedDateContext = React.createContext(
  {} as SelectedDateContextType
);
