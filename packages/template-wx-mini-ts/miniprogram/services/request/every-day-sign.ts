import { request } from '../core/core';

export interface EveryDaySignParams {
  content: string;
  pictures: string[];
  latitude: number | null;
  longitude: number | null;
  location: string;
  checkInDate: string;
}

export const everyDaySign = async (projectId: string, {
  checkInDate,
  content,
  latitude,
  location,
  longitude,
  pictures,
}: EveryDaySignParams) => {
  await request.post(
    '/api/v1/shsj/student/project/trip/checkin/',
    {
      pictures,
      latitude,
      longitude,
      location,
      'check_in_date': checkInDate,
      content,
      'project': projectId,
    },
  );
};
