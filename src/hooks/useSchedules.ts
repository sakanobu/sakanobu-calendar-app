import React from 'react';
import firebase from 'firebase/app';
import { getSchedules } from 'services/request_firebase';

export type ScheduleWithUserTagColor = {
  title: string;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  createdByUser: {
    name: string;
  };
  selectedTag: {
    name: string;
    checked: boolean;
    selectedColor: {
      name: string;
      theme: string;
    };
  };
};

type UseTodo = {
  schedules: ScheduleWithUserTagColor[];
};

// useScheduleの引数として指定した日付を渡す必要あるっぽい(コレクション内の全ドキュメントは不要なので)
export const useSchedule = (selectedDate: Date): UseTodo => {
  const [schedules, setSchedules] = React.useState<ScheduleWithUserTagColor[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const newSchedules = await getSchedules(selectedDate);

      setSchedules(newSchedules);
    })();
  }, [selectedDate]);

  return { schedules };
};
