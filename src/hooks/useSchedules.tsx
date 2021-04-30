import React from 'react';
import firebase from 'firebase/app';
import {
  add,
  getAll,
  Color,
  Tag,
  ScheduleWithUserTagColor,
} from 'services/request_schedules';
import { getUnixTime } from 'date-fns';

export type UseScheduleType = {
  schedules: ScheduleWithUserTagColor[];
  addSchedule: (
    title: string,
    tagRef: firebase.firestore.DocumentReference,
    startTime: Date
  ) => Promise<void>;
};

export const useSchedule = (selectedDate: Date): UseScheduleType => {
  const [schedules, setSchedules] = React.useState<ScheduleWithUserTagColor[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const newSchedules = await getAll(selectedDate);

      setSchedules(newSchedules);
    })();
  }, [selectedDate]);

  const addSchedule = React.useCallback(
    async (
      title: string,
      tagRef: firebase.firestore.DocumentReference,
      startTime: Date
    ): Promise<void> => {
      const newSchedule = {
        title,
        tagRef,
        startTime: new firebase.firestore.Timestamp(getUnixTime(startTime), 0),
      };

      const tag = (await newSchedule.tagRef.get()).data() as Tag;

      // TODO あれ､固定値になってる???
      const color = { name: 'red', theme: 'palette.error.dark' } as Color;

      await add(newSchedule).then((addedSchedule) => {
        const newScheduleWithUserTagColor: ScheduleWithUserTagColor = {
          title: addedSchedule.title,
          startTime: addedSchedule.startTime,
          selectedTag: {
            name: tag.name,
            tagRef: tag.tagRef,
            selectedColor: {
              ...color,
            },
          },
        };

        setSchedules([newScheduleWithUserTagColor].concat(schedules));
      });

      return new Promise((resolve) => {
        resolve();
      });
    },
    [schedules]
  );

  return { schedules, addSchedule };
};
