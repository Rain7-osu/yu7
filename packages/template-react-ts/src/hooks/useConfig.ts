import { ConfigKeys } from '../common/config-keys';
import { useSelector } from '../common/dvaHooks';

export const useConfig = <T>(key: ConfigKeys, format?: (value: string) => T): T | string => {
  const config = useSelector(({ global }) => global.config);
  const preValue = config[key] || '';
  return format?.(preValue) || preValue;
};

export const useGrayConfig = (grayKey: ConfigKeys) => {
  const config = useConfig(grayKey);
  return 'true' === config;
};
