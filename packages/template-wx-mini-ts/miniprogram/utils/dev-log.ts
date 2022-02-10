import { Env, getEnv } from './env';
import { formatTime } from './util';

/**
 * 日志级别
 * @param args
 */
export const devLog = (...args: any[]) => {
  if (getEnv() !== Env.Release) {
    // eslint-disable-next-line no-console
    console.log(formatTime(new Date()), ...args);
  }
};
