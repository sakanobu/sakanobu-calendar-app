import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Navigation from 'components/Navigation/index';
import Calendar from 'components/Calendar/index';
import AddTagDialog from 'components/Dialog/AddTagDialog';
import DeleteConfirmDialog from 'components/Dialog/DeleteConfirmDialog';
import EditScheduleDialog from 'components/Dialog/EditScheduleDialog';
import EditTagDialog from 'components/Dialog/EditTagDialog';
import ScheduleDetailDialog from 'components/Dialog/ScheduleDetailDialog';
import ScheduleListDialog from 'components/Dialog/ScheduleListDialog';
import UnsaveConfirmDialog from 'components/Dialog/UnsaveConfirmDialog';

const App: FC = () => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <Navigation />
        <Calendar />

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
