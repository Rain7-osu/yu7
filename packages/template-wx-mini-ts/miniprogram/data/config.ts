export enum ConfigKeys {
  KEY = 'key',
}

export type Config = Partial<Record<ConfigKeys, string>>;
