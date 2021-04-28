/**
 * @jest-environment node
 */

import { getAll } from 'services/request_schedules';

test('Firebaseからカレンダーに埋め込む用のデータも加えたSchedulesWithUserTagColorを取得する', async () => {
  const data = await getAll(new Date());

  console.log(data);

  expect(data).toBeTruthy();
});
