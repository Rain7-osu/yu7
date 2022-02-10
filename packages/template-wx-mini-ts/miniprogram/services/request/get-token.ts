import { request } from '../core/core';
import { CODE_BASE64 } from '../../common/config';

export const getToken = async (code: string): Promise<string> => {
  const res = await request.get(
    `/api/v1/shsj/token/?${CODE_BASE64}=${code}`,
  );

  return String(res?.token);
};
