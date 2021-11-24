// import { encrypt } from '../utils/encrypt';
// import { login } from './http';
// import { IResponse } from '@src/api/core/types';

import { setAccessToken } from '@src/api/token';

export interface LoginFormData {
  username: string;
  password: string;
}

export const fetchLogin = async ({
  username,
  password,
}: LoginFormData) => {
  // 这里去使用 login 去登录, 再 loginFactory 中会设置 accessToken

  // const res = await login.post<IResponse<any>>('/api/user/login', {
  //   username,
  //   password: encrypt(password),
  // });
  //
  // return res?.data || {};

  // 这里仅作 mock 测试 setAccessToken ， 如果需要设置，请在 core/fetcher 里面去设置
  setAccessToken(`Token: ${username}-${password}`);
};
