"use client";
import { nanoid } from "nanoid";
import {
  PracticeTestDetail,
  // Update
  UpdateBaseInfo,
  UpdateQuestion,
  UpdateOption,
  UpdatePracticeTest,
} from "@/domain/entities/PracticeTest";
import { useAuthContext } from "@/presentation/context/authContext";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  getPracticeTestDetail,
  getUserPracticeTest,
} from "@/presentation/services/practice_test.service";

export default function useMyPractice() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getNewOption = (): UpdateOption => ({
    id: null,
    tempId: nanoid(),
    text: "",
    isCorrect: false,
  });
  const getNewQuestion = (): UpdateQuestion => ({
    id: null,
    tempId: nanoid(),
    question: {
      text: "",
      type: "SINGLE_CHOICE",
    },
    options: Array.from({ length: 4 }, () => getNewOption()),
  });

  // Raw data
  const [baseInfo, setBaseInfo] = useState<UpdateBaseInfo>();
  const [questions, setQuestions] = useState<UpdateQuestion[]>([]);

  // Changed data
  const [changedName, setChangedName] = useState<UpdateBaseInfo>();
  const [changedQuestions, setChangedQuestions] = useState<UpdateQuestion[]>(
    []
  );

  // UI
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Card Behavior
  const handleDeleteCard = (index: number, id: string | null) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (id === null || newQuestions[index].id === id) {
        newQuestions.splice(index, 1);
      }
      return newQuestions;
    });
  };

  const handleAddCard = () => {
    setIsSubmitted(false);
    setQuestions((prev) => [...prev, getNewQuestion()]);
  };

  // Input Change
  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;
    setChangedName((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    questionId: string | null,
    questionIndex: number,
    questionType: string,
    optionId: string | null,
    optionIndex: number | null
  ) => {
    setIsSubmitted(false);
    const target = event.target;
    const section = event.target.dataset.section;

    const { name, value } = target;
    setChangedQuestions((prev) => {
      const newChangedQuestion = [...prev];
      if (!questions[questionIndex]) return prev;

      let currentIndex = newChangedQuestion.findIndex((changedQuestion) => {
        if (questionId !== null) {
          return changedQuestion.id === questionId;
        } else {
          return changedQuestion.tempId === questions[questionIndex].tempId;
        }
      });

      if (currentIndex < 0) {
        const currentQuestion = questions[questionIndex];
        newChangedQuestion.push({
          id: questionId,
          tempId: currentQuestion.tempId ? currentQuestion.tempId : undefined,
          question: {
            text: questions[questionIndex].question.text,
            type: questions[questionIndex].question.type,
          },
          options: questions[questionIndex].options,
        });
        currentIndex = newChangedQuestion.length - 1;
      }

      // Update questionBase
      if (section === "questionBase") {
        if (name === "type") {
          // MULTIPLE <-> SINGLE
          if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(
              newChangedQuestion[currentIndex].question.type
            ) &&
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value)
          ) {
            questions[questionIndex].options.forEach(
              (option) => (option.isCorrect = false)
            );
            newChangedQuestion[currentIndex].options.forEach(
              (option) => (option.isCorrect = false)
            );
          }
          // SINGLE / MULTIPLE -> TRUE_FALSE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(
              newChangedQuestion[currentIndex].question.type
            ) &&
            value === "TRUE_FALSE"
          ) {
            questions[questionIndex].options = [
              { id: null, tempId: nanoid(), text: "Đúng", isCorrect: false },
              { id: null, tempId: nanoid(), text: "Sai", isCorrect: false },
            ];
            newChangedQuestion[currentIndex].options = [
              { id: null, tempId: nanoid(), text: "Đúng", isCorrect: false },
              { id: null, tempId: nanoid(), text: "Sai", isCorrect: false },
            ];
          }
          // TRUE_FALSE -> SINGLE / MULTIPLE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value) &&
            newChangedQuestion[currentIndex].question.type === "TRUE_FALSE"
          ) {
            questions[questionIndex].options = Array.from({ length: 4 }, () =>
              getNewOption()
            );
            newChangedQuestion[currentIndex].options = Array.from(
              { length: 4 },
              () => getNewOption()
            );
          }
        }

        newChangedQuestion[currentIndex].question = {
          ...newChangedQuestion[currentIndex].question,
          [name]: value,
        };
      }
      // MULTIPLE <-> SINGLE
      else if (section === "options" && optionId && optionIndex !== null) {
        // Update option
        if (!questions[questionIndex].options[optionIndex].id) return prev;

        let currentOptionIndex = newChangedQuestion[
          currentIndex
        ].options.findIndex((option) => option.id === optionId);

        const currentOption =
          newChangedQuestion[currentIndex].options[currentOptionIndex];

        if (currentOptionIndex < 0) {
          newChangedQuestion[currentIndex].options.push({
            id: currentOption.id,
            tempId: currentOption.tempId ? currentOption.tempId : undefined,
            text: currentOption.text,
            isCorrect: currentOption.isCorrect,
          });

          currentOptionIndex =
            newChangedQuestion[currentIndex].options.length - 1;
        }

        const nameOption = name.split("-")[0];
        const isChecked = (target as HTMLInputElement).checked;

        if (questionType === "MULTIPLE_CHOICE") {
          newChangedQuestion[currentIndex].options[currentOptionIndex] = {
            ...newChangedQuestion[currentIndex].options[currentOptionIndex],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        } else {
          if (nameOption === "isCorrect") {
            newChangedQuestion[currentIndex].options.forEach((option) => {
              option.isCorrect = false;
            });
          }
          newChangedQuestion[currentIndex].options[currentOptionIndex] = {
            ...newChangedQuestion[currentIndex].options[currentOptionIndex],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        }
      }
      // Câu hỏi mới hoặc chuyển sang true false
      else if (section === "options" && !optionId && optionIndex !== null) {
        const nameOption = name.split("-")[0];
        const isChecked = (target as HTMLInputElement).checked;

        if (nameOption === "isCorrect") {
          newChangedQuestion[currentIndex].options.forEach((option) => {
            option.isCorrect = false;
          });
        }

        newChangedQuestion[currentIndex].options[optionIndex] = {
          ...newChangedQuestion[currentIndex].options[optionIndex],
          [nameOption]: nameOption === "isCorrect" ? isChecked : value,
        };
      }
      return newChangedQuestion;
    });
  };

  const handleAddOption = (questionIndex: number) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (!newQuestions[questionIndex]) return prev;
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [...newQuestions[questionIndex].options, getNewOption()],
      };
      return newQuestions;
    });
  };

  const handleDeleteOption = (
    questionId: string | null,
    optionId: string | null,
    questionTempId?: string,
    newQuestionIndex?: number,
    optionTempId?: string,
    newOptionIndex?: number
  ) => {
    if (
      questionTempId !== undefined &&
      optionTempId !== undefined &&
      newOptionIndex !== undefined &&
      newQuestionIndex !== undefined
    ) {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[newQuestionIndex] = {
          ...newQuestions[newQuestionIndex],
          options: newQuestions[newQuestionIndex].options.filter(
            (_, index) => index !== newOptionIndex
          ),
        };
        return newQuestions;
      });
      setChangedQuestions((prev) => {
        const newQuestions = [...prev];
        const currentIndex = newQuestions.findIndex(
          (question) => question.tempId === questionTempId
        );
        if (currentIndex < 0) return prev;
        const currentOptionIndex = newQuestions[currentIndex].options.findIndex(
          (option) => option.tempId === optionTempId
        );

        newQuestions[currentIndex] = {
          ...newQuestions[currentIndex],
          options: newQuestions[currentIndex].options.filter(
            (_, index) => index !== currentOptionIndex
          ),
        };
        return newQuestions;
      });
    } else {
      setQuestions((prev) => {
        const newQuestions = [...prev];

        const curIndex = newQuestions.findIndex(
          (question) => question.id === questionId
        );
        if (curIndex < 0) return prev;

        const curOptionIndex = newQuestions[curIndex].options.findIndex(
          (option) => option.id === optionId
        );
        if (curOptionIndex < 0) return prev;

        newQuestions[curIndex] = {
          ...newQuestions[curIndex],
          options: newQuestions[curIndex].options.filter(
            (_, index) => index !== curOptionIndex
          ),
        };
        return newQuestions;
      });

      setChangedQuestions((prev) => {
        const newChangedQuestions = [...prev];
        const curIndex = newChangedQuestions.findIndex(
          (changedQuestion) => changedQuestion.id === questionId
        );
        if (curIndex < 0) return prev;

        const curOptionIndex = newChangedQuestions[curIndex].options.findIndex(
          (changedOption) => changedOption.id === optionId
        );
        if (curOptionIndex < 0) return prev;

        if (curIndex < 0 || curOptionIndex < 0) return prev;
        newChangedQuestions[curIndex] = {
          ...newChangedQuestions[curIndex],
          options: newChangedQuestions[curIndex].options.filter(
            (_, index) => index !== curOptionIndex
          ),
        };
        return newChangedQuestions;
      });
    }
  };

  // Save
  const handleSaveChange = (valid: boolean) => {
    setIsSubmitted(true);
    console.log(valid);
    if (valid) {
      const updatePracticeTest: UpdatePracticeTest = {
        ...(changedName && { baseInfo: changedName }),
        questions: changedQuestions,
      };
      console.log(updatePracticeTest);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseData = async () => {
      const practiceTestId = searchParams.get("practice-test-id");
      if (!practiceTestId) return;

      const userPracticeTest = await getUserPracticeTest();
      if (
        !userPracticeTest.some(
          (practiceTest) => practiceTest.id === practiceTestId
        )
      ) {
        router.push("/dashboard");
        return;
      }

      const response: PracticeTestDetail = await getPracticeTestDetail(
        practiceTestId
      );
      if (response) {
        setBaseInfo(response.baseInfo);
        setQuestions(
          response.questions.map((question) => ({
            id: question.question.id,
            question: {
              text: question.question.text,
              type: question.question.type,
            },
            options: question.options.map((option) => ({
              id: option.id,
              text: option.text,
              isCorrect: option.isCorrect,
            })),
          }))
        );
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  return {
    // Data
    baseInfo,
    questions,
    changedName,
    changedQuestions,
    // UI
    isLoading,
    isSubmitted,
    // Card Behavior
    handleDeleteCard,
    handleAddCard,
    // Input Change
    handleBaseInfoChange,
    handleQuestionChange,
    handleAddOption,
    handleDeleteOption,
    // Save
    handleSaveChange,
  };
}
