import { request } from '../core/core';
import { IStudentInfo } from '../../data/interfaces/user';
import { transformStudentInfo } from '../tools/transform-student-info';

export const getUserInfo = async (): Promise<IStudentInfo> => {
  const res = await request.get('/api/v1/shsj/student/info/');
  return transformStudentInfo(res);
};
