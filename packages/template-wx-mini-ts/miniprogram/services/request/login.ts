import { loginCenterRequest } from '../core/core';
import { encrypt } from '../../utils/des';

export const login = async (params: ILoginData): Promise<string> => {
  const url = '/api/simple/account/login/';
  const originData = {
    phone: params.phone,
    password: params.password,
    rights: ['__all__'],
    action: 'login',
  };

  const data = encrypt(JSON.stringify(originData));

  const res = await loginCenterRequest(url, 'POST', { data });

  return String(res?.code);
};
