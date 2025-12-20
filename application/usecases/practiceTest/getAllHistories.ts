import { ResultWithPracticeTest } from '@/domain/entities/Result';
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/PracticeTestRepositoryImpl";

export class GetAllHistoriesUsecase {
  constructor(
    private readonly practiceTestRepository: PracticeTestRepositoryImpl
  ) {}

  async execute(accessToken: string): Promise<ResultWithPracticeTest[]> {
    return await this.practiceTestRepository.getAllHistories(accessToken);
  }
}
