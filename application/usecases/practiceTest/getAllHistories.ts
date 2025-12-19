import { PracticeTest } from "@/domain/entities/PracticeTest";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/PracticeTestRepositoryImpl";

export class GetAllHistoriesUsecase {
  constructor(
    private readonly practiceTestRepository: PracticeTestRepositoryImpl
  ) {}

  async execute(accessToken: string): Promise<PracticeTest[]> {
    return await this.practiceTestRepository.getAllHistories(accessToken);
  }
}
