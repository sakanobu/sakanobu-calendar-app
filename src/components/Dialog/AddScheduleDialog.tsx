/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, VFC } from 'react';
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
import { useAddSchedule } from 'hooks/useAddSchedule';

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

const AddScheduleDialog: VFC<Props> = React.memo<Props>((props) => {
  const classes = useStyles();

  const [inputValues, inputHandlers] = useAddSchedule();

  // 予定/日付/開始時間/終了時間でnull上書きしていないのはご操作でダイアログを閉じた時に
  // 予定の部分は残っていたほうがいいかなという判断
  const closeDialog = React.useCallback(() => {
    props.handleClose();
    inputHandlers.setSelectedTagName('必ず選択してください');
    inputHandlers.setSelectedTagId(null);
  }, [props, inputHandlers]);

  const handleScheduleTitle = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      inputHandlers.setScheduleTitle(event.target.value);
    },
    [inputHandlers]
  );

  const handleDateInput = React.useCallback(
    (date) => {
      inputHandlers.setSelectedDate(date);
    },
    [inputHandlers]
  );

  const handleStartTimeInput = React.useCallback(
    (date) => {
      inputHandlers.setSelectedStartTime(date);
    },
    [inputHandlers]
  );

  const handleTagSelectBox = React.useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedTagBox = props.tagBoxes.find(
        (tagBox) => tagBox.tag.name === event.target.value
      );

      if (selectedTagBox === undefined) {
        throw new Error();
      }

      inputHandlers.setSelectedTagName(selectedTagBox.tag.name);
      inputHandlers.setSelectedTagId(selectedTagBox.tag.tagId);
    },
    [props.tagBoxes, inputHandlers]
  );

  const handleSubmit = React.useCallback(() => {
    if (inputValues.selectedTagId === null) {
      throw new Error();
    }

    props
      .addSchedule(
        inputValues.scheduleTitle,
        inputValues.selectedTagId,
        new Date(
          inputValues.objectForDate.year,
          inputValues.objectForDate.month,
          inputValues.objectForDate.date,
          inputValues.objectForDate.hours,
          inputValues.objectForDate.minutes
        )
      )
      .catch(() => {
        console.error('Error at AddScheduleDialog.tsx');
      });

    // TODO new Date()は1回で良くないか?
    props.handleClose();
    inputHandlers.setScheduleTitle('');
    inputHandlers.setSelectedTagName('必ず選択してください');
    inputHandlers.setSelectedTagId(null);
    inputHandlers.setSelectedDate(new Date());
    inputHandlers.setSelectedStartTime(new Date());
  }, [props, inputValues, inputHandlers]);

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <DialogTitle>予定を追加</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="予定"
          size="small"
          value={inputValues.scheduleTitle}
          variant="outlined"
          onChange={handleScheduleTitle}
        />
        <DatePicker
          format="yyyy/MM/dd"
          label="日付"
          openTo="year"
          value={inputValues.selectedDate}
          views={['year', 'month', 'date']}
          onChange={handleDateInput}
        />
        <TimePicker
          label="開始時間"
          value={inputValues.selectedStartTime}
          onChange={handleStartTimeInput}
        />
        <FormControl>
          <InputLabel shrink htmlFor="tag">
            タグ
          </InputLabel>
          <NativeSelect
            inputProps={{ id: 'tag' }}
            value={inputValues.selectedTagName}
            onChange={handleTagSelectBox}
          >
            <option value="">必ず選択してください</option>
            {props.tagBoxes.map((tagBox) => (
              <>
                <option key={tagBox.tag.name} value={tagBox.tag.name}>
                  {tagBox.tag.name}
                </option>
              </>
            ))}
          </NativeSelect>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeDialog}>
          キャンセル
        </Button>
        <Button
          color="primary"
          disabled={!inputValues.scheduleTitle || !inputValues.selectedTagId}
          variant="contained"
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
