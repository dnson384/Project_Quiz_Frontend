import { ICourseRepository } from "@/domain/repositories/ICourseRepository";

export class DeleteCourseUsecase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(courseId: string, accessToken: string): Promise<boolean> {
    return await this.courseRepository.deleteCourse(courseId, accessToken);
  }
}
