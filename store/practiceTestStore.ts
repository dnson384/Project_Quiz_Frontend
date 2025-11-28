import { create } from "zustand";

interface PracticeTestData {
  practice_test_id: string;
  practice_test_name: string;
  author_avatar_url: string;
  author_username: string;
}

interface QuestionSelectedData {
  [key: number]: AnswerOption;
}

interface QuestionData {
  question_id: string;
  question_text: string;
  question_type: string;
}

interface AnswerOption {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface PracticeTestQuestionData {
  question: QuestionData;
  answer_option: AnswerOption[];
}

interface TestResultData {
  score: number;
  practiceTest: PracticeTestData | null;
  shuffleQuestions: PracticeTestQuestionData[];
  selectedOptions: QuestionSelectedData;
}

interface testResultState {
  practiceTestResult: TestResultData;
  setPracticeTestResult: (
    score: number,
    practiceTest: PracticeTestData,
    shuffleQuestions: PracticeTestQuestionData[],
    selectedOptions: QuestionSelectedData
  ) => void;
}

export const usePracticeTestResult = create<testResultState>((set) => ({
  practiceTestResult: {
    score: 0,
    practiceTest: null,
    shuffleQuestions: [],
    selectedOptions: {},
  },
  setPracticeTestResult: (
    score: number,
    practiceTest: PracticeTestData,
    shuffleQuestions: PracticeTestQuestionData[],
    selectedOptions: QuestionSelectedData
  ) =>
    set(() => ({
      practiceTestResult: {
        score,
        practiceTest,
        shuffleQuestions,
        selectedOptions,
      },
    })),
}));
