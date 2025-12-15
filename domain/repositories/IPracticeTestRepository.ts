import { PracticeTest, PracticeTestDetail } from "../entities/PracticeTest";

export interface IPracticeTestRepository {
  getRandomPracticeTests: () => Promise<PracticeTest[]>;
  getPracticeTestDetail: (
    id: string,
  ) => Promise<PracticeTestDetail | null>;
  getPracticeTestRandomDetail: (
    id: string,
    count?: number
  ) => Promise<PracticeTestDetail | null>;
  getUserPracticeTests: (accessToken: string) => Promise<PracticeTest[]>;
}
