import React from 'react';
import firebase from 'firebase/app';
import { getUnixTime } from 'date-fns';
import { db } from 'firebase/index';
// import { db } from 'firebase';
import {
  add,
  getAll,
  Schedule,
  Color,
  Tag,
  ScheduleWithTagAndColor,
} from 'services/request_schedules';

export type UseScheduleType = {
  schedules: ScheduleWithTagAndColor[];
  addSchedule: (title: string, tagId: string, startTime: Date) => Promise<void>;
};

export const useSchedule = (selectedDate: Date): UseScheduleType => {
  const [schedules, setSchedules] = React.useState<ScheduleWithTagAndColor[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const newSchedules = await getAll(selectedDate);

      setSchedules(newSchedules);
    })().catch(() => {
      console.error('Error at useSchedules.tsx');
    });
  }, [selectedDate]);

  const addSchedule = React.useCallback(
    async (title: string, tagId: string, startTime: Date): Promise<void> => {
      const newSchedule: Schedule = {
        title,
        tagId,
        startTime: new firebase.firestore.Timestamp(getUnixTime(startTime), 0),
      };

      const tagRef = db.collection('tags').doc(`${newSchedule.tagId}`);
      const tag = (await tagRef.get()).data() as Tag;

      const colorRef = db.collection('colors').doc(`${tag.colorId}`);
      const color = (await colorRef.get()).data() as Color;

      await add(newSchedule).then((addedSchedule) => {
        const newScheduleWithTagAndColor: ScheduleWithTagAndColor = {
          title: addedSchedule.title,
          startTime: addedSchedule.startTime,
          selectedTag: {
            name: tag.name,
            tagId: newSchedule.tagId,
            selectedColor: {
              ...color,
            },
          },
        };

        setSchedules([newScheduleWithTagAndColor].concat(schedules));
      });

      return new Promise((resolve) => {
        resolve();
      });
    },
    [schedules]
  );

  return { schedules, addSchedule };
};
