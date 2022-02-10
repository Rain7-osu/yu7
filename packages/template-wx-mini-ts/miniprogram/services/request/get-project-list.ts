import { request } from '../core/core';
import { transformProjectList } from '../tools/transform-project-list';

/**
 * 获取已立项的项目列表
 */
export const getProjectList = async () => {
  const res = await request.get('/api/v1/shsj/student/project/trip/list/');
  return transformProjectList(res?.results || []);
};
