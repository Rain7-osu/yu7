/**
 * 通过经纬度获取准确城市
 * @param latitude 纬度
 * @param longitude 经度
 */
import { request } from '../core/core';

export const getLocation = async (latitude: number, longitude: number): Promise<string> => {
  const res = await request.get(`/api/v1/shsj/base/location/?latitude=${latitude}&longitude=${longitude}`);
  return res?.location;
};
