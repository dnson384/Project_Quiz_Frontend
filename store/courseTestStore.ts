import { create } from "zustand";

interface QuestionData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface OptionsData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface QuestionsData {
  question: QuestionData;
  options: OptionsData[];
}

interface CourseData {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface OptionSelectedData {
  optionId: string;
  correctId: string;
}

interface QuestionSelectedData {
  [key: number]: OptionSelectedData;
}

interface TestResultData {
  score: number;
  course: CourseData | null;
  questions: QuestionsData[];
  shuffleQuestions: QuestionData[][];
  selectedOptions: QuestionSelectedData;
}

interface testResultState {
  testResult: TestResultData;
  setTestResult: (
    score: number,
    course: CourseData,
    questions: QuestionsData[],
    shuffleQuestions: QuestionData[][],
    selectedOptions: QuestionSelectedData
  ) => void;
}

export const useTestResult = create<testResultState>((set) => ({
  testResult: {
    score: 0,
    course: null,
    questions: [],
    shuffleQuestions: [],
    selectedOptions: {},
  },
  setTestResult: (
    score: number,
    course: CourseData,
    questions: QuestionsData[],
    shuffleQuestions: QuestionData[][],
    selectedOptions: QuestionSelectedData
  ) =>
    set(() => ({
      testResult: {
        score,
        course,
        questions,
        shuffleQuestions,
        selectedOptions,
      },
    })),
}));
