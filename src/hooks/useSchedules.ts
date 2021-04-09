import firebase from 'firebase';

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
