import React, { VFC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Navigation from 'components/Navigation/Navigation';
import CalendarContainer from 'components/Calendar/Calendar';
import AddTagDialog from 'components/Dialog/AddTagDialog';
import DeleteConfirmDialog from 'components/Dialog/DeleteConfirmDialog';
import EditScheduleDialog from 'components/Dialog/EditScheduleDialog';
import EditTagDialog from 'components/Dialog/EditTagDialog';
import ScheduleDetailDialog from 'components/Dialog/ScheduleDetailDialog';
import ScheduleListDialog from 'components/Dialog/ScheduleListDialog';
import UnsaveConfirmDialog from 'components/Dialog/UnsaveConfirmDialog';
import { useSchedule } from 'hooks/useSchedules';
import { useTags } from 'hooks/useTags';

const App: VFC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { schedules, addSchedule } = useSchedule(selectedDate);
  const { tagBoxes } = useTags();

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
        <Navigation
          addSchedule={addSchedule}
          handleChangeSelectedDate={handleChangeSelectedDate}
          selectedDate={selectedDate}
          tagBoxes={tagBoxes}
        />
        <CalendarContainer schedules={schedules} selectedDate={selectedDate} />

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
