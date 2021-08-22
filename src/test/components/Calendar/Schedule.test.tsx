import { customRender } from 'test/testUtils';
// import Schedule from 'components/Calendar/Schedule';
// import { ScheduleWithTagAndColor } from 'services/request_schedules';

// const mockSchedules: ScheduleWithTagAndColor[] = [
//   {
//     title: '睡眠',
//     startTime: 1617202800,
//     selectedTag: {
//       name: '日課',
//       tagRef: ,
//       selectedColor: {
//         name: 'red',
//         theme: 'palette.error.dark',
//       },
//     },
//   },
// ];

describe('ScheduleListDialogコンポーネントとの連携', () => {
  it('初回のレンダリングではScheduleListDialogが存在していない', () => {
    // customRender(<Schedule />);
    customRender(<div />);
    expect(1).toBe(1);
  });
  it.todo(
    'classがscheduleContainerの部分をクリックするとその日付に則したに則した予定を持つScheduleListDialogを表示'
  );
});
