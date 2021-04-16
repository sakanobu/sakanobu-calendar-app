import firebase from 'firebase/app';
import { startOfMonth, endOfMonth } from 'date-fns';
import { db } from '../firebase';

type Schedule = {
  title: string;
  userRef: firebase.firestore.DocumentReference;
  tagRef: firebase.firestore.DocumentReference;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
};

type User = {
  name: string;
};

type Tag = {
  name: string;
  checked: boolean;
  colorRef: firebase.firestore.DocumentReference;
};

type Color = {
  name: string;
  theme: string;
};

type TagWithColor = {
  name: string;
  checked: boolean;
  selectedColor: {
    name: string;
    theme: string;
  };
};

export type ScheduleWithUserTagColor = {
  title: string;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  createdByUser: {
    name: string;
  };
  selectedTag: TagWithColor;
};

export const getSchedulesWithUserTagColor = async (
  selectedDate: Date
): Promise<ScheduleWithUserTagColor[]> => {
  const schedulesQuerySnapshot = await db
    .collection('schedules')
    .where('startTime', '>=', startOfMonth(selectedDate))
    .where('startTime', '<=', endOfMonth(selectedDate))
    .orderBy('startTime')
    .get();

  return await Promise.all(
    await schedulesQuerySnapshot.docs.map(async (doc) => {
      const schedule = doc.data() as Schedule;

      const user = (await schedule.userRef.get()).data() as User;

      const tag = (await schedule.tagRef.get()).data() as Tag;

      const color = (await tag.colorRef.get()).data() as Color;

      return {
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        createdByUser: { ...user },
        selectedTag: {
          name: tag.name,
          checked: tag.checked,
          selectedColor: {
            ...color,
          },
        },
      };
    })
  );
};

export const getTagsWithColor = async (): Promise<TagWithColor[]> => {
  const tagsQuerySnapshot = await db.collection('tags').get();

  return await Promise.all(
    tagsQuerySnapshot.docs.map(async (doc) => {
      const tag = doc.data() as Tag;

      const color = (await tag.colorRef.get()).data() as Color;

      return {
        name: tag.name,
        checked: tag.checked,
        selectedColor: {
          name: color.name,
          theme: color.theme,
        },
      };
    })
  );
};
