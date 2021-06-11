import firebase from 'firebase/app';
import { startOfMonth, endOfMonth } from 'date-fns';
import { db } from 'firebase/index';

export type Schedule = {
  title: string;
  tagId: string;
  startTime: firebase.firestore.Timestamp;
};

export type Tag = {
  tagId: string;
  name: string;
  checked: boolean;
  colorId: string;
};

export type Color = {
  name: string;
  theme: string;
};

export type TagWithColor = {
  name: string;
  tagId: string;
  selectedColor: {
    name: string;
    theme: string;
  };
};

export type ScheduleWithTagAndColor = {
  title: string;
  startTime: firebase.firestore.Timestamp;
  selectedTag: TagWithColor;
};

export const getAll = async (
  selectedDate: Date
): Promise<ScheduleWithTagAndColor[]> => {
  const schedulesQuerySnapshot = await db
    .collection('schedules')
    .where('startTime', '>=', startOfMonth(selectedDate))
    .where('startTime', '<=', endOfMonth(selectedDate))
    .orderBy('startTime')
    .get();

  return Promise.all(
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await schedulesQuerySnapshot.docs.map(async (doc) => {
      const schedule = doc.data() as Schedule;

      const tagRef = db.collection('tags').doc(`${schedule.tagId}`);
      const tag = (await tagRef.get()).data() as Tag;

      const colorRef = db.collection('colors').doc(`${tag.colorId}`);
      const color = (await colorRef.get()).data() as Color;

      return {
        title: schedule.title,
        startTime: schedule.startTime,
        selectedTag: {
          name: tag.name,
          tagId: schedule.tagId,
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
