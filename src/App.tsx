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
import { SelectedDateContext } from 'hooks/useSelectedDateContext';
import { useSchedule } from 'hooks/useSchedules';
import { useTags } from 'hooks/useTags';

const App: FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { schedules, addSchedule } = useSchedule(selectedDate);
  const { tagBoxes } = useTags();

  // const handleChangeSelectedDate = (date: MaterialUiPickersDate): void => {
  //   if (date === null) {
  //     throw new Error('日付にnullが指定されました');
  //   }
  //   setSelectedDate(date);
  // };

  const handleChangeSelectedDate = async (
    date: MaterialUiPickersDate
  ): Promise<Date> => {
    if (date === null) {
      throw new Error('日付にnullが指定されました');
    }
    setSelectedDate(date);

    return date;
  };

  return (
    <>
      <MuiPickersUtilsProvider locale={jaLocale} utils={DateFnsUtils}>
        <SelectedDateContext.Provider
          value={{ selectedDate, handleChangeSelectedDate }}
        >
          <Navigation addSchedule={addSchedule} tagBoxes={tagBoxes} />
          <Calendar schedules={schedules} />
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
