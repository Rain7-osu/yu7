import { IProject } from '../../data/interfaces/project';
import { CollegeType } from '../../data/maps/college-map';
import { transformStudentInfo } from './transform-student-info';
import { transformTeacherInfo } from './transform-teacher-info';

export const transformProjectList = (res: any[]): IProject[] => {
  return res.map((item) => ({
    captain: transformStudentInfo(item?.captain),
    category: item?.practice_category?.category_no,
    college: Number(item?.college?.college_no) as CollegeType || 0,
    createTime: item.create_time,
    name: item.project_name,
    students: item.students.map(transformStudentInfo),
    subCategory: item.practice_category.sub_category_no,
    teachers: item.teachers.map(transformTeacherInfo),
    uuid: item.uuid,
  }));
};
