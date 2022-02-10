import { ITeacherInfo } from '../../data/interfaces/user';

export const transformTeacherInfo = (teacher: any): ITeacherInfo => {
  // TODO finish, fallback
  return {
    uuid: teacher?.uuid,
    name: teacher?.name,
    phone: teacher?.phone,
    sex: teacher?.sex,
    job: teacher?.job,
    jobTitle: teacher?.job_title,
    nation: teacher?.nation,
    tno: teacher?.tno,
    complete: teacher?.complete,
    email: teacher?.email,
    college: teacher?.college,
  };
};
