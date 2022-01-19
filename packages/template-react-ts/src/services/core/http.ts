import type { AxiosRequestConfig } from 'axios';
import type { IResponse } from './types';
import { httpFactory } from './fetcher';

export const http = httpFactory();

export const transformResponse = <T = any> (res: IResponse<T>, message?: string): T => {
  if (1 === res?.code) {
    return res?.data || {} as any;
  }

  throw res?.message || message;
};

const del = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const res = await http.delete(
    url,
    config,
  );
  return transformResponse<T>(res);
};

const post = async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
  const res = await http.post(
    url,
    data,
    config,
  );
  return transformResponse<T>(res);
};

const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const res = await http.get(
    url,
    config,
  );
  return transformResponse<T>(res);
};

const patch = async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
  const res = await http.patch(
    url,
    data,
    config,
  );
  return transformResponse<T>(res);
};

export const request = {
  del,
  post,
  get,
  patch,
};

