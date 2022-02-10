// eslint-disable-next-line @typescript-eslint/no-var-requires
const CosAuth = require('../../lib/cos-auth.min.js');
import { uploadFile } from '../core/upload-core';
import { Credentials, getCredentials } from './get-credentials';

const Bucket = 'shsj-1308804236';
const Region = 'ap-beijing';

const getAuthorization = (credentials: Credentials) => {
  return {
    XCosSecurityToken: credentials.sessionToken,
    Authorization: CosAuth({
      SecretId: credentials.tmpSecretId,
      SecretKey: credentials.tmpSecretKey,
      Method: 'POST',
      Pathname: '/',
    }),
  };
};

export const uploadSignPicture = async (filePath: string, filename: string) => {
  const credentials = await getCredentials();
  const authorization = getAuthorization(credentials);
  const prefix = `https://${Bucket}.cos.${Region}.myqcloud.com/`;

  return await uploadFile({
    url: prefix,
    name: 'file',
    filePath,
    formData: {
      'key': filename,
      'success_action_status': 200,
      'Signature': authorization.Authorization,
      'x-cos-security-token': authorization.XCosSecurityToken,
      'Content-Type': '',
    },
  });
};
