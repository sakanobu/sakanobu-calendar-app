import React from 'react';
import {
  getSchedules,
  ScheduleWithUserTagColor,
} from 'services/request_firebase';

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
