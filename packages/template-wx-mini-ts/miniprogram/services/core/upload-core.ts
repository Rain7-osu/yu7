import UploadFileOption = WechatMiniprogram.UploadFileOption;
import UploadFileSuccessCallback = WechatMiniprogram.UploadFileSuccessCallback;

export const uploadFile = (options: Omit<UploadFileOption, 'success' | 'fail' | 'complete'>) => {
  return new Promise<Parameters<UploadFileSuccessCallback>[0]>((resolve, reject) => {
    wx.uploadFile({
      ...options,
      success: (res) => {
        resolve(res);
      },
      fail: (e) => {
        reject(e);
      },
    });
  });
};
