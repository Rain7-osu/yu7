import { request } from '../core/core';

export interface Credentials {
  sessionToken: string;
  tmpSecretId: string;
  tmpSecretKey: string;
}

export const getCredentials = async (): Promise<Credentials> => {
  const res = await request.get('/api/v1/shsj/student/project/trip/checkin/temp-key/');
  return {
    sessionToken: res?.sessionToken,
    tmpSecretId: res?.tmpSecretId,
    tmpSecretKey: res?.tmpSecretKey,
  };
};
