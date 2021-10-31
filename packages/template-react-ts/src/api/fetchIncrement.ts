/*
  示例 调用 api 接口的文件
 */

// import { http } from './http';
// import { IResponse } from './core/types';

export async function fetchIncrement(base: number) {
  // const res = await http.get<IResponse<null>>(`/api/xxx`);
  // if (res?.flag) {
  //   return true;
  // } else {
  //   throw res?.message || '未知错误';
  // }
  return Promise.resolve(base + 1);
}
