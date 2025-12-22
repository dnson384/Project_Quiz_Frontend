import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  PracticeTestQuestions,
  AnswerQuestionData,
  PracticeTestDetail,
  PracticeTest,
} from "@/domain/entities/PracticeTest";

import usePracticeTestDetail from "./usePracticeTestDetail";
import { shuffleArray } from "@/presentation/utils/arrayHelpers";
import { usePracticeTestResult } from "@/presentation/store/practiceTestStore";
import { generateSlug } from "@/presentation/utils/textFormatter";
import {
  getPracticeTestRandomDetail,
  submitPracticeTest,
} from "@/presentation/services/practice_test.service";

export default function useTakePracticeTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Data
  const [baseInfo, setBaseInfo] = useState<PracticeTest>();
  const [questions, setQuestions] = useState<PracticeTestQuestions[]>();

  const [timer, setTimer] = useState<number>(0);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnswerQuestionData>({});

  const handleOptionSelected = (
    questionIndex: number,
    questionType: string,
    optionId: string,
    isCorrect: boolean
  ) => {
    setAnsweredQuestions((prev) => {
      const newAnsweredOptions = { ...prev };
      if (newAnsweredOptions[questionIndex]) {
        let newOptions = [...newAnsweredOptions[questionIndex].optionId];

        let newIsCorrect = newAnsweredOptions[questionIndex].isCorrect;
        const curRawQuestion = questions?.find(
          (question) =>
            question.question.id ===
            newAnsweredOptions[questionIndex].questionId
        );
        if (!curRawQuestion) return prev;
        const correctAnswersId = curRawQuestion.options
          .filter((option) => option.isCorrect === true)
          .map((option) => option.id);

        if (questionType === "MULTIPLE_CHOICE") {
          const curOptIndex = newAnsweredOptions[
            questionIndex
          ].optionId.findIndex((id) => id === optionId);

          // optionid
          if (curOptIndex < 0) {
            newOptions.push(optionId);
          } else {
            newOptions.splice(curOptIndex, 1);
          }

          // iscorrect
          if (correctAnswersId.length !== newOptions.length) {
            newIsCorrect = false;
          } else {
            newIsCorrect = !newOptions.some(
              (id) => !correctAnswersId.includes(id)
            );
          }
        } else {
          newOptions = [optionId];
          newIsCorrect = correctAnswersId.includes(optionId);
        }
        newAnsweredOptions[questionIndex] = {
          ...newAnsweredOptions[questionIndex],
          optionId: newOptions,
          isCorrect: newIsCorrect,
        };
      }
      return newAnsweredOptions;
    });
  };

  const handleSubmitTestClick = async () => {
    const practiceTestId = searchParams.get("uuid");
    const questionsCount = questions?.length;
    const score = Object.values(answeredQuestions).reduce(
      (total, opt) => (total += opt.isCorrect ? 1 : 0),
      0
    );
    if (!practiceTestId || !questionsCount) return;

    const resultId = await submitPracticeTest(
      practiceTestId,
      answeredQuestions,
      questionsCount,
      score
    );
    if (resultId) {
      console.log(resultId)
      router.replace(`/history/${practiceTestId}?rid=${resultId}`);
    }
  };

  const handleSidebarClick = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleClose = () => {
    const practiceTestId = searchParams.get("uuid");
    if (!baseInfo) return;
    const slug = generateSlug(baseInfo?.name);
    router.push(`/practice-test/${slug}?uuid=${practiceTestId}`);
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const practiceTestId = searchParams.get("uuid");
      if (!practiceTestId) return;

      const data: PracticeTestDetail = await getPracticeTestRandomDetail(
        practiceTestId
      );

      if (data) {
        setBaseInfo(data.baseInfo);
        setQuestions(data.questions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAnsweredQuestions((prev) => {
      if (!questions) return prev;

      const newAnsweredOptions = { ...prev };
      questions.forEach((question, index) => {
        answeredQuestions[index] = {
          questionId: question.question.id,
          optionId: [],
          isCorrect: false,
        };
      });
      return newAnsweredOptions;
    });
  }, [questions]);

  // Timer
  useEffect(() => {
    const timer = searchParams.get("timer");
    if (timer) {
      setIsTimeOut(false);
      setTimer(Number(timer) * 60);
    }
  }, []);

  useEffect(() => {
    if (isTimeOut) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          setIsTimeOut(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    baseInfo,
    questions,
    timer,
    isTimeOut,
    answeredQuestions,
    handleClose,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  };
}
