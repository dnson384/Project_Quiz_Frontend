import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  PracticeTestQuestions,
  AnswerQuestionData,
} from "@/domain/entities/PracticeTest";

import usePracticeTestDetail from "./usePracticeTestDetail";
import { shuffleArray } from "@/presentation/utils/arrayHelpers";
import { usePracticeTestResult } from "@/presentation/store/practiceTestStore";
import { generateSlug } from "@/presentation/utils/textFormatter";
import { submitPracticeTest } from "@/presentation/services/practice_test.service";



export default function useTakePracticeTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { baseInfo, questions } = usePracticeTestDetail();
  const [shuffledQuestions, setShuffledQuestions] = useState<
    PracticeTestQuestions[]
  >([]);

  const [timer, setTimer] = useState<number>(0);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnswerQuestionData>({});

  const setPracticeTestResult = usePracticeTestResult(
    (state) => state.setPracticeTestResult
  );

  useEffect(() => {
    const shuffleQuestionOptions: PracticeTestQuestions[] = questions.map(
      (ques) => {
        const question = ques.question;
        const options = shuffleArray(ques.options);
        return {
          question: question,
          options: options,
        };
      }
    );
    setShuffledQuestions(shuffleArray(shuffleQuestionOptions));
  }, [questions]);

  const handleOptionSelected = (
    questionIndex: number,
    optionId: string,
    isCorrect: boolean
  ) => {
    setAnsweredQuestions((prev) => {
      const newAnsweredOptions = { ...prev };
      if (newAnsweredOptions[questionIndex]) {
        newAnsweredOptions[questionIndex] = {
          ...newAnsweredOptions[questionIndex],
          optionId: optionId,
          isCorrect: isCorrect,
        };
      }
      return newAnsweredOptions;
    });
  };

  const handleSubmitTestClick = async () => {
    const practiceTestId = searchParams.get("uuid");
    const questionsCount = questions.length;
    const score = Object.values(answeredQuestions).reduce(
      (total, opt) => (total += opt.isCorrect ? 1 : 0),
      0
    );
    if (!practiceTestId || !questionsCount) return;

    const summitStatus = await submitPracticeTest(
      practiceTestId,
      answeredQuestions,
      questionsCount,
      score
    );
    if (summitStatus) {
      console.log("done");
    }

    // if (!baseInfo || !shuffledQuestions) return;
    // const courseId = searchParams.get("uuid");

    // let score = 0;
    // Object.values(selectedOptionId).forEach((value) => {
    //   value.isCorrect && score++;
    // });
    // setPracticeTestResult(score, baseInfo, shuffledQuestions, selectedOptionId);
    // router.push(`/practice-test/result?uuid=${courseId}`);
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

  useEffect(() => {
    setAnsweredQuestions((prev) => {
      const newAnsweredOptions = { ...prev };
      questions.forEach((question, index) => {
        answeredQuestions[index] = {
          questionId: question.question.id,
          optionId: "",
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
    shuffledQuestions,
    timer,
    isTimeOut,
    answeredQuestions,
    handleClose,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  };
}
