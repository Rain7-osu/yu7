import { IStudentInfo } from '../../data/interfaces/user';
import { CollegeType } from '../../data/maps/college-map';

export const transformStudentInfo = (student: any): IStudentInfo => {
  return {
    college: Number(student?.college) as CollegeType || 0,
    degree: student?.degree,
    email: student?.email,
    grade: student?.grade,
    major: student?.major,
    name: student?.name,
    phone: student?.phone,
    sex: student?.sex,
    sno: student?.sno,
    uuid: student?.uuid,
    complete: student?.complete,
  };
};
