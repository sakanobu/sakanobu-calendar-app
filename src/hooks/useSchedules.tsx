import React from 'react';
import { getAll, ScheduleWithUserTagColor } from 'services/request_schedules';

type UseSchedules = {
  schedules: ScheduleWithUserTagColor[];
};

export const useSchedule = (selectedDate: Date): UseSchedules => {
  const [schedules, setSchedules] = React.useState<ScheduleWithUserTagColor[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const newSchedules = await getAll(selectedDate);

      setSchedules(newSchedules);
    })();
  }, [selectedDate]);

  return { schedules };
};
