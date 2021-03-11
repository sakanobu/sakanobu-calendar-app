import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Navigation from 'components/Navigation/index';
import Calendar from 'components/Calendar/index';
import AddTagDialog from 'components/Dialog/AddTagDialog';
import DeleteConfirmDialog from 'components/Dialog/DeleteConfirmDialog';
import EditScheduleDialog from 'components/Dialog/EditScheduleDialog';
import EditTagDialog from 'components/Dialog/EditTagDialog';
import ScheduleDetailDialog from 'components/Dialog/ScheduleDetailDialog';
import ScheduleListDialog from 'components/Dialog/ScheduleListDialog';
import UnsaveConfirmDialog from 'components/Dialog/UnsaveConfirmDialog';

type SelectedDateContextType = {
  selectedDate: Date;
  handleChangeSelectedDate: (date: MaterialUiPickersDate) => void;
};
export const SelectedDateContext = React.createContext(
  {} as SelectedDateContextType
);

const App: FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChangeSelectedDate = (date: MaterialUiPickersDate): void => {
    if (date === null) {
      throw new Error('日付にnullが指定されました');
    }
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <SelectedDateContext.Provider
          value={{ selectedDate, handleChangeSelectedDate }}
        >
          <Navigation />
          <Calendar />
        </SelectedDateContext.Provider>

        <AddTagDialog />
        <DeleteConfirmDialog />
        <EditScheduleDialog />
        <EditTagDialog />
        <ScheduleDetailDialog />
        <ScheduleListDialog />
        <UnsaveConfirmDialog />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default App;
