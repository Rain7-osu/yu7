import { devLog } from './dev-log';

export const showError = async (err: any) => {
  const errMessage = err?.toString() || err?.message || String(err);

  await wx.showToast({
    title: errMessage,
    icon: 'none',
    duration: 2000,
  });

  devLog(err);
};
