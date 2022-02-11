import { request } from '../core/core';
import { transformConfig } from '../tools/transform-config';

export const getConfig = async () => {
  const res = await request.get('/api/v1/config');
  return transformConfig(res);
};
