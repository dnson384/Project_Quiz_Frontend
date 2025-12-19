import axios, { isAxiosError } from "axios";

import {
  AnswerQuestionData,
  DeleteOptionData,
  NewPracticeTest,
  PracticeTest,
  PracticeTestDetail,
  PracticeTestQuestions,
  Question,
  QuestionOption,
  UpdatePracticeTest,
  OptionSelectedData,
} from "@/domain/entities/PracticeTest";
import { IPracticeTestRepository } from "@/domain/repositories/IPracticeTestRepository";

interface RawPracticeTestResponse {
  practice_test_id: string;
  practice_test_name: string;
  author_avatar_url: string;
  author_username: string;
}

interface RawQuestion {
  question_id: string;
  question_text: string;
  question_type: string;
}

interface RawQuestionOption {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface RawQuestions {
  question: RawQuestion;
  options: RawQuestionOption[];
}

interface RawPracticeTestDetailResponse {
  practice_test: RawPracticeTestResponse;
  questions: RawQuestions[];
}

export class PracticeTestRepositoryImpl implements IPracticeTestRepository {
  constructor(
    private readonly baseUrl: string = process.env.BACKEND_URL || ""
  ) {}

  async getUserPracticeTests(accessToken: string): Promise<PracticeTest[]> {
    try {
      const { data } = await axios.get<RawPracticeTestResponse[]>(
        `${this.baseUrl}/practice-test/my-practice-tests`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data.map((raw) => ({
        id: raw.practice_test_id,
        name: raw.practice_test_name,
        authorAvatar: raw.author_avatar_url,
        authorName: raw.author_username,
      }));
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response?.data.detail);
        return [];
      }
      console.error("Lỗi khi gọi backend từ repo: ", err);
      return [];
    }
  }

  async getRandomPracticeTests(): Promise<PracticeTest[]> {
    try {
      const { data } = await axios.get<RawPracticeTestResponse[]>(
        `${this.baseUrl}/practice-test/random`
      );

      return data.map((raw) => ({
        id: raw.practice_test_id,
        name: raw.practice_test_name,
        authorAvatar: raw.author_avatar_url,
        authorName: raw.author_username,
      }));
    } catch (err) {
      console.error("Lỗi khi gọi backend từ practice test repo:", err);
      return [];
    }
  }

  async getPracticeTestDetail(id: string): Promise<PracticeTestDetail | null> {
    try {
      const { data } = await axios.get<RawPracticeTestDetailResponse>(
        `${this.baseUrl}/practice-test`,
        {
          params: {
            practice_test_id: id,
          },
        }
      );

      const rawBaseInfo = data.practice_test;
      const rawQuestions = data.questions;

      const baseInfoDomain: PracticeTest = {
        id: rawBaseInfo.practice_test_id,
        name: rawBaseInfo.practice_test_name,
        authorAvatar: rawBaseInfo.author_avatar_url,
        authorName: rawBaseInfo.author_username,
      };

      const questionsDomain: PracticeTestQuestions[] = [];
      rawQuestions.forEach((raw) => {
        const rawQuestion = raw.question;
        const questionDomain: Question = {
          id: rawQuestion.question_id,
          text: rawQuestion.question_text,
          type: rawQuestion.question_type,
        };

        const optionsDomain: QuestionOption[] = [];
        raw.options.forEach((option) => {
          optionsDomain.push({
            id: option.option_id,
            text: option.option_text,
            isCorrect: option.is_correct,
          });
        });

        questionsDomain.push({
          question: questionDomain,
          options: optionsDomain,
        });
      });

      return {
        baseInfo: baseInfoDomain,
        questions: questionsDomain,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAllHistories(accessToken: string): Promise<PracticeTest[]> {
    const { data } = await axios.get<RawPracticeTestResponse[]>(
      `${this.baseUrl}/practice-test/history`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.map((raw) => ({
      id: raw.practice_test_id,
      name: raw.practice_test_name,
      authorAvatar: raw.author_avatar_url,
      authorName: raw.author_username,
    }));
  }

  async getPracticeTestRandomDetail(
    id: string,
    count?: number
  ): Promise<PracticeTestDetail | null> {
    try {
      const { data } = await axios.get<RawPracticeTestDetailResponse>(
        `${this.baseUrl}/practice-test/random-questions`,
        {
          params: {
            practice_test_id: id,
            ...(count && { count: count }),
          },
        }
      );

      const rawBaseInfo = data.practice_test;
      const rawQuestions = data.questions;

      const baseInfoDomain: PracticeTest = {
        id: rawBaseInfo.practice_test_id,
        name: rawBaseInfo.practice_test_name,
        authorAvatar: rawBaseInfo.author_avatar_url,
        authorName: rawBaseInfo.author_username,
      };

      const questionsDomain: PracticeTestQuestions[] = [];
      rawQuestions.forEach((raw) => {
        const rawQuestion = raw.question;
        const questionDomain: Question = {
          id: rawQuestion.question_id,
          text: rawQuestion.question_text,
          type: rawQuestion.question_type,
        };

        const optionsDomain: QuestionOption[] = [];
        raw.options.forEach((option) => {
          optionsDomain.push({
            id: option.option_id,
            text: option.option_text,
            isCorrect: option.is_correct,
          });
        });

        questionsDomain.push({
          question: questionDomain,
          options: optionsDomain,
        });
      });

      return {
        baseInfo: baseInfoDomain,
        questions: questionsDomain,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async createNewPracticeTest(
    accessToken: string,
    newPracticeTest: NewPracticeTest
  ): Promise<boolean> {
    const base_info = {
      practice_test_name: newPracticeTest.baseInfo.name,
    };
    const questions = newPracticeTest.questions.map((question) => {
      const questionBase = {
        question_text: question.questionBase.text,
        question_type: question.questionBase.type,
      };
      const options = question.options.map((option) => ({
        option_text: option.text,
        is_correct: option.isCorrect,
      }));

      return {
        question: questionBase,
        options: options,
      };
    });

    const { data } = await axios.post(
      `${this.baseUrl}/practice-test`,
      {
        base_info: base_info,
        questions: questions,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return data;
  }

  async submitTest(
    practiceTestId: string,
    accessToken: string,
    answerQuestions: AnswerQuestionData,
    questionsCount: number,
    score: number
  ): Promise<boolean> {
    const { data } = await axios.post(
      `${this.baseUrl}/practice-test/submit-test`,
      {
        practice_test_id: practiceTestId,
        answer_questions: Object.values(answerQuestions).map(
          (answer: OptionSelectedData) => ({
            question_id: answer.questionId,
            option_id: answer.optionId.length === 0 ? null : answer.optionId,
          })
        ),
        num_of_questions: questionsCount,
        score: score,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  }

  async updatePracticeTest(
    practiceTestId: string,
    accessToken: string,
    updatePracticeTest: UpdatePracticeTest
  ): Promise<boolean> {
    const baseInfo = updatePracticeTest.baseInfo
      ? updatePracticeTest.baseInfo
      : null;
    const questions = updatePracticeTest.questions.map((question) => {
      const questionId = question.id;
      const questionBase = question.question
        ? {
            question_text: question.question.text,
            question_type: question.question.type,
          }
        : null;
      const options = question.options.map((option) => ({
        option_id: option.id,
        option_text: option.text,
        is_correct: option.isCorrect,
      }));
      return {
        question_id: questionId,
        question: questionBase,
        options: options,
      };
    });
    const { data } = await axios.put(
      `${this.baseUrl}/practice-test/${practiceTestId}`,
      {
        base_info: baseInfo,
        questions: questions,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  }

  async deleteOptions(
    practiceTestId: string,
    accessToken: string,
    deleteOptions: DeleteOptionData[]
  ): Promise<boolean> {
    const deleteOptionsPayload = deleteOptions.map((delOpt) => ({
      question_id: delOpt.questionId,
      option_id: delOpt.optionId,
    }));
    const { data } = await axios.delete(
      `${this.baseUrl}/practice-test/${practiceTestId}/options`,
      {
        data: deleteOptionsPayload,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }

  async deleteQuestions(
    practiceTestId: string,
    accessToken: string,
    deleteQuestions: string[]
  ): Promise<boolean> {
    const { data } = await axios.delete(
      `${this.baseUrl}/practice-test/${practiceTestId}/questions`,
      {
        data: { question_id: deleteQuestions },
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  }
}
