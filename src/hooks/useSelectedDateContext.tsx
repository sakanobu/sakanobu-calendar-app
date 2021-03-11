import React from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type SelectedDateContextType = {
  selectedDate: Date;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => void;
};

export const SelectedDateContext = React.createContext(
  {} as SelectedDateContextType
);
