import { PracticeTest } from "./PracticeTest";

export interface Result {
  readonly id: string;
  questionsCount: number;
  score: number;
}

export interface ResultWithPracticeTest {
  result: Result
  baseInfo: PracticeTest
}