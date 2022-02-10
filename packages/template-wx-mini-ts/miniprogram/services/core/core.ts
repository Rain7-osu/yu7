import RequestOption = WechatMiniprogram.RequestOption;
import RequestSuccessCallbackResult = WechatMiniprogram.RequestSuccessCallbackResult;
import { Env, getEnv } from '../../utils/env';
import { BizError, ServiceError } from './service-error';
import GeneralCallbackResult = WechatMiniprogram.GeneralCallbackResult;
import { gdoic } from '../../utils/factory';

export type Method =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export type RequestConfig = Omit<RequestOption, 'success' | 'fail' | 'data' | 'url' | 'method'>;

const PROD_URL = 'https://www.demo.com';
const DEV_URL = 'https://dev.www.demo.com';

export const getUrl = () => {
  const env = getEnv();
  return env === Env.Release ? PROD_URL : DEV_URL;
};

interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const transformResponse = (res: IResponse) => {
  if (res?.code === 1) {
    return res?.data;
  }

  throw new BizError(res?.code, res?.message);
};

export const fetch = <T = any>(options: Omit<RequestOption, 'success' | 'fail'>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    (async () => {
      const requestPromise = new Promise<RequestSuccessCallbackResult<T>>((innerResolve, innerReject) => {
        wx.request<T>({
          ...options,
          success: (res) => {
            innerResolve(res);
          },
          fail: (err) => {
            innerReject(err);
          },
        });
      });

      try {
        const res = await requestPromise;

        if (res?.statusCode >= 200 && res?.statusCode < 300) {
          resolve(res?.data);
        }

        reject(new ServiceError(res?.statusCode, res?.errMsg));
      } catch (e) {
        const error = e as GeneralCallbackResult;
        reject(new ServiceError(-1, error.errMsg));
      }
    })();
  });
};

export const requestFactory = async (
  url: string,
  method: Method,
  data?: any,
  config?: RequestConfig,
  // eslint-disable-next-line max-params
) => {
  const token = wx.getStorageSync('token') || '';

  const requestConfig: RequestConfig = {
    ...config,
    header: {
      ...config?.header || {},
      ...gdoic(token, { Authorization: token }),
    },
  };

  const res = await fetch({
    url: `${getUrl()}${url}`,
    method,
    data,
    ...requestConfig,
  });

  return transformResponse(res);
};

export const request = {
  get: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'GET', undefined, config);
  },
  post: async (url: string, data: any, config?: RequestConfig) => {
    return await requestFactory(url, 'POST', data, config);
  },
  put: async (url: string, data: any, config?: RequestConfig) => {
    return await requestFactory(url, 'PUT', data, config);
  },
  delete: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'DELETE', undefined, config);
  },
  options: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'OPTIONS', undefined, config);
  },
  head: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'HEAD', undefined, config);
  },
  trace: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'TRACE', undefined, config);
  },
  connect: async (url: string, config?: RequestConfig) => {
    return await requestFactory(url, 'CONNECT', undefined, config);
  },
};
