import { request } from '../core/core';

export const getCheckInStatus = async (projectId: string) => {
  const res = await request.get(`/api/v1/shsj/student/project/trip/checkin/${projectId}/checkin-status/
`);
  return !!res['checkin'];
};
