import axios, { isAxiosError } from "axios";

import {
  PracticeTest,
  PracticeTestDetail,
  PracticeTestQuestions,
  Question,
  QuestionOption,
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

  async getPracticeTestRandomDetail(
    id: string,
    count?: number
  ): Promise<PracticeTestDetail | null> {
    try {
      const { data } = await axios.get<RawPracticeTestDetailResponse>(
        `${this.baseUrl}/practice-test/random-question`,
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
}
