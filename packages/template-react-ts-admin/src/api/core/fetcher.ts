import { setAccessToken, getAccessTokenAsync } from '../token';
import type { HttpInstance, RequestInterceptor, ResponseInterceptor } from './request';
import { baseHttpFactory } from './request';

export type RequestOnFulfilled = RequestInterceptor[0];
export type RequestOnRejected = RequestInterceptor[1];
export type ResponseOnFulfilled = ResponseInterceptor[0];
export type ResponseOnRejected = ResponseInterceptor[1];

/**
 * 登录系列 api 调用的请求工厂，附带 token
 * 包括，login, register, changePassword
 */
export const loginFactory = () => {
  return baseHttpFactory<HttpInstance>({
    responseInterceptor: [loginResponseInterceptorFactory()],
  });
};

export const httpFactory = () => {
  return baseHttpFactory<HttpInstance>({
    requestInterceptor: [httpRequestInterceptorFactory()],
    responseInterceptor: [httpResponseInterceptorFactory()],
  });
};

const httpRequestInterceptorFactory = () => {
  const onFulfilled: RequestOnFulfilled = async (config) => {
    const { headers } = config;

    const token = (await getAccessTokenAsync()) || '';

    return {
      ...config,
      headers: {
        ...headers,
        token,
      },
    };
  };

  return [onFulfilled] as RequestInterceptor;
};

const loginResponseInterceptorFactory = () => {
  const onFulfilled: ResponseOnFulfilled = async (res) => {
    // 可以在这里设置 token
    setAccessToken('a-token');
    console.warn('请在 /api/core/fetcher 中, line: 50 设置 accessToken');

    // const { headers } = res;
    // headers?.token && setAccessToken(headers.token);

    return res ? res.data : res;
  };

  const onRejected: ResponseOnRejected = async (err) => {
    return Promise.resolve(err);
  };

  return [onFulfilled, onRejected] as ResponseInterceptor;
};

const httpResponseInterceptorFactory = () => {
  const onFulfilled: ResponseOnFulfilled = async (res) => {
    return res ? res.data : res;
  };

  const onRejected: ResponseOnRejected = async (err) => {
    return Promise.resolve(err);
  };

  return [onFulfilled, onRejected] as ResponseInterceptor;
};
