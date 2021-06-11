import React, { VFC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Navigation from 'components/Navigation/Navigation';
import Calendar from 'components/Calendar/Calendar';
import DayOfTheWeek from 'components/Calendar/DayOfTheWeek';
import Schedule from 'components/Calendar/Schedule';
import AddTagDialog from 'components/Navigation/AddTagDialog';
import DeleteConfirmDialog from 'components/Utility/DeleteConfirmDialog';
import EditScheduleDialog from 'components/Calendar/EditScheduleDialog';
import EditTagDialog from 'components/Navigation/EditTagDialog';
import ScheduleDetailDialog from 'components/Calendar/ScheduleDetailDialog';
import ScheduleListDialog from 'components/Calendar/ScheduleListDialog';
import UnsaveConfirmDialog from 'components/Utility/UnsaveConfirmDialog';
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
        <Calendar>
          <DayOfTheWeek />
          <Schedule schedules={schedules} selectedDate={selectedDate} />
        </Calendar>

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
