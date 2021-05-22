/**
 * @jest-environment node
 */

import { getAll } from 'services/request_schedules';

// TODO: Firebaseへのカレンダーに埋め込むデータのリクエストのテストをしっかり書く
describe('Firebaseへの予定に関するリクエスト', () => {
  it('Firebaseからカレンダーに埋め込む用のデータも加えたSchedulesWithUserTagColorを取得する', async () => {
    expect.hasAssertions();

    const data = await getAll(new Date());

    console.log(data);

    expect(data).toBeTruthy();
  });
});
