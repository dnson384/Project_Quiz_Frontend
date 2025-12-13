import {
  Course,
  CourseDetail,
  CourseLearn,
  CourseTest,
} from "../entities/Course";
export interface ICourseRepository {
  getRandomCourses: () => Promise<Course[]>;
  getCourseDetail: (id: string) => Promise<CourseDetail | null>;
  getCourseLearn: (id: string) => Promise<CourseLearn | null>;
  getCourseTest: (id: string) => Promise<CourseTest | null>;
  getUserCourses: (accessToken: string) => Promise<Course[]>;
}
