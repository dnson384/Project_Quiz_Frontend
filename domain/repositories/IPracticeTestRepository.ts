import {
  DeleteOptionData,
  NewPracticeTest,
  PracticeTest,
  PracticeTestDetail,
  UpdatePracticeTest,
} from "../entities/PracticeTest";

export interface IPracticeTestRepository {
  getRandomPracticeTests: () => Promise<PracticeTest[]>;
  getPracticeTestDetail: (id: string) => Promise<PracticeTestDetail | null>;
  getPracticeTestRandomDetail: (
    id: string,
    count?: number
  ) => Promise<PracticeTestDetail | null>;
  getUserPracticeTests: (accessToken: string) => Promise<PracticeTest[]>;
  createNewPracticeTest: (
    accessToken: string,
    newPracticeTest: NewPracticeTest
  ) => Promise<boolean>;
  updatePracticeTest(
    practiceTestId: string,
    accessToken: string,
    updatePracticeTest: UpdatePracticeTest
  ): Promise<boolean>;
  deleteOptions(
    practiceTestId: string,
    accessToken: string,
    deleteOptions: DeleteOptionData[]
  ): Promise<boolean>;
  deleteQuestions(
    practiceTestId: string,
    accessToken: string,
    deleteQuestions: string[]
  ): Promise<boolean>;
}
