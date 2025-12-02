import { CourseTest } from "@/domain/entities/Course";
import { ICourseRepository } from "@/domain/repositories/ICourseRepository";

export class GetCourseTestUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(id: string): Promise<CourseTest | null> {
    const CourseTest = await this.courseRepository.getCourseTest(id);
    return CourseTest;
  }
}
