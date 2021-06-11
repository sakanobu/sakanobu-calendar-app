import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type ObjectForDate = {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
};

type InputValue = {
  scheduleTitle: string;
  selectedTagName: string | null;
  selectedTagId: string | null;
  selectedDate: Date | null;
  selectedStartTime: Date | null;
  objectForDate: ObjectForDate;
};

type InputHandler = {
  setScheduleTitle: Dispatch<SetStateAction<string>>;
  setSelectedTagName: Dispatch<SetStateAction<string | null>>;
  setSelectedTagId: Dispatch<SetStateAction<string | null>>;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  setSelectedStartTime: Dispatch<SetStateAction<Date | null>>;
  setObjectForDate: Dispatch<SetStateAction<ObjectForDate>>;
};

type UseAddSchedule = readonly [InputValue, InputHandler];

export const useAddSchedule = (): UseAddSchedule => {
  const [scheduleTitle, setScheduleTitle] = useState('');

  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  // TODO handle○○()のnew Date()って1回で良くないか?
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    new Date()
  );

  const [objectForDate, setObjectForDate] = useState<ObjectForDate>({
    year: Number(new Date().getFullYear()),
    month: Number(new Date().getMonth()),
    date: Number(new Date().getDate()),
    hours: Number(new Date().getHours()),
    minutes: Number(new Date().getMinutes()),
  });

  useEffect(() => {
    setObjectForDate((state) => ({
      ...state,
      year: Number(selectedDate?.getFullYear()),
      month: Number(selectedDate?.getMonth()),
      date: Number(selectedDate?.getDate()),
    }));
  }, [selectedDate]);

  useEffect(() => {
    setObjectForDate((state) => ({
      ...state,
      hours: Number(selectedStartTime?.getHours()),
      minutes: Number(selectedStartTime?.getMinutes()),
    }));
  }, [selectedStartTime]);

  return [
    {
      scheduleTitle,
      selectedTagName,
      selectedTagId,
      selectedDate,
      selectedStartTime,
      objectForDate,
    },
    {
      setScheduleTitle,
      setSelectedTagName,
      setSelectedTagId,
      setSelectedDate,
      setSelectedStartTime,
      setObjectForDate,
    },
  ] as const;
};
