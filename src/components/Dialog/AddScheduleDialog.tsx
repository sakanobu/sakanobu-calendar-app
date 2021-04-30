/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC } from 'react';
import firebase from 'firebase/app';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import type { UseScheduleType } from 'hooks/useSchedules';
import type { TagBox } from 'hooks/useTags';

type Props = {
  open: boolean;
  handleClose: () => void;
  addSchedule: UseScheduleType['addSchedule'];
  tagBoxes: TagBox[];
};

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexFlow: 'column',
    },
  })
);

const AddScheduleDialog: FC<Props> = React.memo<Props>((props) => {
  const classes = useStyles();

  const [scheduleTitle, setScheduleTitle] = React.useState('');

  const [selectedTagName, setSelectedTagName] = React.useState<string | null>(
    null
  );

  const [
    selectedTagRef,
    setSelectedTagRef,
  ] = React.useState<firebase.firestore.DocumentReference | null>(null);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date | null>(
    new Date()
  );

  const [objectForDate, setObjectForDate] = React.useState({
    year: Number(new Date().getFullYear()),
    month: Number(new Date().getMonth()),
    date: Number(new Date().getDate()),
    hours: Number(new Date().getHours()),
    minutes: Number(new Date().getMinutes()),
  });

  React.useEffect(() => {
    setObjectForDate((state) => {
      return {
        ...state,
        year: Number(selectedDate?.getFullYear()),
        month: Number(selectedDate?.getMonth()),
        date: Number(selectedDate?.getDate()),
      };
    });
  }, [selectedDate]);

  React.useEffect(() => {
    setObjectForDate((state) => {
      return {
        ...state,
        hours: Number(selectedStartTime?.getHours()),
        minutes: Number(selectedStartTime?.getMinutes()),
      };
    });
  }, [selectedStartTime]);

  // 予定/日付/開始時間/終了時間でnull上書きしていないのはご操作でダイアログを閉じた時に
  // 予定の部分は残っていたほうがいいかなという判断
  const closeDialog = React.useCallback(() => {
    props.handleClose();
    setSelectedTagName('必ず選択してください');
    setSelectedTagRef(null);
  }, []);

  const handleScheduleTitle = React.useCallback((event) => {
    setScheduleTitle(event.target.value);
  }, []);

  const handleDateInput = React.useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleStartTimeInput = React.useCallback((date) => {
    setSelectedStartTime(date);
  }, []);

  const handleTagSelectBox = React.useCallback(
    (event) => {
      const selectedTagBox = props.tagBoxes.find((tagBox) => {
        return tagBox.tag.name === event.target.value;
      });

      if (selectedTagBox === undefined) {
        throw new Error();
      }

      setSelectedTagName(selectedTagBox.tag.name);
      setSelectedTagRef(selectedTagBox.tag.tagRef);
    },
    [props.tagBoxes]
  );

  const handleSubmit = React.useCallback(() => {
    if (selectedTagRef === null) {
      throw new Error();
    }

    props.addSchedule(
      scheduleTitle,
      selectedTagRef,
      new Date(
        objectForDate['year'],
        objectForDate['month'],
        objectForDate['date'],
        objectForDate['hours'],
        objectForDate['minutes']
      )
    );

    props.handleClose();
    setScheduleTitle('');
    setSelectedTagName('必ず選択してください');
    setSelectedTagRef(null);
    setSelectedDate(new Date());
    setSelectedStartTime(new Date());
  }, [scheduleTitle, selectedTagRef, objectForDate]);

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <DialogTitle>予定を追加</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="予定"
          variant="outlined"
          size="small"
          value={scheduleTitle}
          onChange={handleScheduleTitle}
        />
        <DatePicker
          label="日付"
          format="yyyy/MM/dd"
          openTo="year"
          views={['year', 'month', 'date']}
          value={selectedDate}
          onChange={handleDateInput}
        />
        <TimePicker
          label="開始時間"
          value={selectedStartTime}
          onChange={handleStartTimeInput}
        />
        <FormControl>
          <InputLabel shrink htmlFor="tag">
            タグ
          </InputLabel>
          <NativeSelect
            inputProps={{ id: 'tag' }}
            value={selectedTagName}
            onChange={handleTagSelectBox}
          >
            <option value={''}>必ず選択してください</option>
            {props.tagBoxes.map((tagBox) => {
              return (
                <>
                  <option value={tagBox.tag.name} key={tagBox.tag.name}>
                    {tagBox.tag.name}
                  </option>
                </>
              );
            })}
          </NativeSelect>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={closeDialog}>
          キャンセル
        </Button>
        <Button
          variant={'contained'}
          color="primary"
          disabled={!scheduleTitle || !selectedTagRef}
          onClick={handleSubmit}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
});

AddScheduleDialog.displayName = 'AddScheduleDialog';

export default AddScheduleDialog;
