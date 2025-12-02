import { PracticeTest, PracticeTestDetail } from "../entities/PracticeTest";

export interface IPracticeTestRepository {
  getRandomPracticeTests: () => Promise<PracticeTest[]>;
  getPracticeTestDetail: (
    id: string,
    count?: number
  ) => Promise<PracticeTestDetail | null>;
}
