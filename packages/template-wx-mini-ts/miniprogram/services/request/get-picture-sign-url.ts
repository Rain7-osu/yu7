import { request } from '../core/core';

export interface GetPictureSignUrlParams {
  projectId: string;
  filename: string;
  date: string;
}

export interface GetPictureSignUrlResponse {
  key: string;
  signedUrl: string;
}

export const getPictureSignUrl = async ({
  projectId,
  filename,
  date,
}: GetPictureSignUrlParams): Promise<GetPictureSignUrlResponse> => {
  const res = await request.post(
    `/api/v1/shsj/student/project/trip/checkin/${projectId}/signed-url/`,
    { filename, date },
  );

  return {
    key: res?.key,
    signedUrl: res?.signed_url,
  };
};
