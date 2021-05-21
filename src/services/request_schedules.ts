import firebase from 'firebase/app';
import { startOfMonth, endOfMonth } from 'date-fns';
import { db } from '../firebase';

type Schedule = {
  title: string;
  tagRef: firebase.firestore.DocumentReference;
  startTime: firebase.firestore.Timestamp;
};

export type Tag = {
  tagRef: firebase.firestore.DocumentReference;
  name: string;
  checked: boolean;
  colorRef: firebase.firestore.DocumentReference;
};

export type Color = {
  name: string;
  theme: string;
};

export type TagWithColor = {
  name: string;
  tagRef: firebase.firestore.DocumentReference;
  selectedColor: {
    name: string;
    theme: string;
  };
};

// TODO Userはもう不要
export type ScheduleWithUserTagColor = {
  title: string;
  startTime: firebase.firestore.Timestamp;
  selectedTag: TagWithColor;
};

export const getAll = async (
  selectedDate: Date
): Promise<ScheduleWithUserTagColor[]> => {
  const schedulesQuerySnapshot = await db
    .collection('schedules')
    .where('startTime', '>=', startOfMonth(selectedDate))
    .where('startTime', '<=', endOfMonth(selectedDate))
    .orderBy('startTime')
    .get();

  return Promise.all(
    // TODO: 合ってるはずなんだけどESLintがエラー報告
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await schedulesQuerySnapshot.docs.map(async (doc) => {
      const schedule = doc.data() as Schedule;

      const tag = (await schedule.tagRef.get()).data() as Tag;

      const color = (await tag.colorRef.get()).data() as Color;

      return {
        title: schedule.title,
        startTime: schedule.startTime,
        selectedTag: {
          name: tag.name,
          tagRef: schedule.tagRef,
          selectedColor: {
            ...color,
          },
        },
      };
    })
  );
};

export const add = async (newSchedule: Schedule): Promise<Schedule> => {
  await db.collection('schedules').add(newSchedule);

  return newSchedule;
};
