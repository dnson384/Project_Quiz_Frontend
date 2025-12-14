import { PracticeTest } from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/IPracticeTestRepository";

export class GetUserPracticeTestsUsecase {
  constructor(
    private readonly practiceTestRepository: IPracticeTestRepository
  ) {}

  async execute(accessToken: string): Promise<PracticeTest[]> {
    return await this.practiceTestRepository.getUserPracticeTests(accessToken);
  }
}
