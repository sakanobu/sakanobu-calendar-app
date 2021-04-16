import firebase from 'firebase/app';
import { startOfMonth, endOfMonth } from 'date-fns';
import { db } from '../firebase';
import type { ScheduleWithUserTagColor } from 'hooks/useSchedules';

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

export const getSchedules = async (
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

      const usersDocumentSnapshot = await db
        .collection('users')
        .doc(schedule.userRef.id)
        .get();

      const userData = usersDocumentSnapshot.data() as User;

      const tagsDocumentSnapshot = await db
        .collection('tags')
        .doc(schedule.tagRef.id)
        .get();

      const tagData = tagsDocumentSnapshot.data() as Tag;

      const colorsDocumentSnapshot = await db
        .collection('colors')
        .doc(tagData.colorRef.id)
        .get();

      const colorData = colorsDocumentSnapshot.data() as Color;

      return {
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        createdByUser: { ...userData },
        selectedTag: {
          name: tagData.name,
          checked: tagData.checked,
          selectedColor: {
            ...colorData,
          },
        },
      };
    })
  );
};
