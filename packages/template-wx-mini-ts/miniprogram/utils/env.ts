export enum Env {

  /**
   * 开发环境
   */
  Develop = 'develop',

  /**
   * 体验版环境
   */
  Trial = 'trial',

  /**
   * 线上环境
   */
  Release = 'release',
}

export const getEnv = () => {
  const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

  switch (envVersion) {
  case 'develop':
    return Env.Develop;
  case 'trial':
    return Env.Trial;
  case 'release':
    return Env.Release;
  default:
    return Env.Release;
  }
};
