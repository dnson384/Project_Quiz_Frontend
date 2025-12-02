export interface PracticeTest {
  readonly id: string;
  name: string;
  authorAvatar: string;
  authorName: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PracticeTestQuestions {
  question: Question;
  options: QuestionOption[];
}

export interface PracticeTestDetail {
  baseInfo: PracticeTest;
  questions: PracticeTestQuestions[];
}
