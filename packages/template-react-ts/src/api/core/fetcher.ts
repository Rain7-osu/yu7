import type { HttpInstance, RequestInterceptor, ResponseInterceptor } from './request';
import { baseHttpFactory } from './request';

export type RequestOnFulfilled = RequestInterceptor[0];
export type RequestOnRejected = RequestInterceptor[1];
export type ResponseOnFulfilled = ResponseInterceptor[0];
export type ResponseOnRejected = ResponseInterceptor[1];

/**
 * 登录系列 api 调用的请求工厂，附带 token
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

    // 可以在这里加入 token
    // const token = await getAccessTokenAsync();

    return {
      ...config,
      headers: {
        ...headers,
        // token,
      },
    };
  };

  return [onFulfilled] as RequestInterceptor;
};

const loginResponseInterceptorFactory = () => {
  const onFulfilled: ResponseOnFulfilled = async (res) => {
    // const { headers } = res;
    // 可以这里设置token
    // setAccessToken(headers.token);
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
