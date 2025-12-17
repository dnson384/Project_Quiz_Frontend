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
  const [deleteOptions, setDeleteOptions] = useState<string[]>([])
  const [deleteQuestions, setDeleteQuestions] = useState<string[]>([])

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
    questionIndex: number,
    questionType: string,
    optionIndex: number | null
  ) => {
    setIsSubmitted(false);
    const target = event.target;
    const section = event.target.dataset.section;

    const { name, value } = target;
    setChangedQuestions((prev) => {
      const newChangedQuestion = [...prev];
      const currentQuestion = questions[questionIndex];
      if (!currentQuestion) return prev;

      let curChangeQuestionIndex = newChangedQuestion.findIndex(
        (changedQuestion) => {
          if (currentQuestion.id !== null) {
            return changedQuestion.id === currentQuestion.id;
          } else {
            return changedQuestion.tempId === currentQuestion.tempId;
          }
        }
      );

      if (curChangeQuestionIndex < 0) {
        const currentQuestion = questions[questionIndex];
        newChangedQuestion.push({
          id: currentQuestion.id,
          tempId: currentQuestion.tempId ? currentQuestion.tempId : undefined,
          question: {
            text: questions[questionIndex].question.text,
            type: questions[questionIndex].question.type,
          },
          options: questions[questionIndex].options,
        });
        curChangeQuestionIndex = newChangedQuestion.length - 1;
      }

      // Update questionBase
      if (section === "questionBase") {
        if (name === "type") {
          // MULTIPLE <-> SINGLE
          if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(
              newChangedQuestion[curChangeQuestionIndex].question.type
            ) &&
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value)
          ) {
            questions[questionIndex].options.forEach(
              (option) => (option.isCorrect = false)
            );
            newChangedQuestion[curChangeQuestionIndex].options.forEach(
              (option) => (option.isCorrect = false)
            );
          }
          // SINGLE / MULTIPLE -> TRUE_FALSE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(
              newChangedQuestion[curChangeQuestionIndex].question.type
            ) &&
            value === "TRUE_FALSE"
          ) {
            questions[questionIndex].options = [
              { id: null, tempId: nanoid(), text: "Đúng", isCorrect: false },
              { id: null, tempId: nanoid(), text: "Sai", isCorrect: false },
            ];
            newChangedQuestion[curChangeQuestionIndex].options = [
              { id: null, tempId: nanoid(), text: "Đúng", isCorrect: false },
              { id: null, tempId: nanoid(), text: "Sai", isCorrect: false },
            ];
          }
          // TRUE_FALSE -> SINGLE / MULTIPLE
          else if (
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value) &&
            newChangedQuestion[curChangeQuestionIndex].question.type ===
              "TRUE_FALSE"
          ) {
            questions[questionIndex].options = Array.from({ length: 4 }, () =>
              getNewOption()
            );
            newChangedQuestion[curChangeQuestionIndex].options = Array.from(
              { length: 4 },
              () => getNewOption()
            );
          }
        }
        newChangedQuestion[curChangeQuestionIndex].question = {
          ...newChangedQuestion[curChangeQuestionIndex].question,
          [name]: value,
        };
      }
      // Update options
      else if (section === "options" && optionIndex !== null) {
        const currentOption = currentQuestion.options[optionIndex];

        const nameOption = name.split("-")[0];
        const isChecked = (target as HTMLInputElement).checked;

        if (currentOption.id) {
          let currentOptionIndex = newChangedQuestion[
            curChangeQuestionIndex
          ].options.findIndex((option) => option.id === currentOption.id);

          if (currentOptionIndex < 0) {
            newChangedQuestion[curChangeQuestionIndex].options.push({
              id: currentOption.id,
              text: currentOption.text,
              isCorrect: currentOption.isCorrect,
            });

            currentOptionIndex =
              newChangedQuestion[curChangeQuestionIndex].options.length - 1;
          }

          if (questionType === "MULTIPLE_CHOICE") {
            newChangedQuestion[curChangeQuestionIndex].options[
              currentOptionIndex
            ] = {
              ...newChangedQuestion[curChangeQuestionIndex].options[
                currentOptionIndex
              ],
              [nameOption]: nameOption === "isCorrect" ? isChecked : value,
            };
          } else {
            if (nameOption === "isCorrect") {
              newChangedQuestion[curChangeQuestionIndex].options.forEach(
                (option) => {
                  option.isCorrect = false;
                }
              );
            }

            newChangedQuestion[curChangeQuestionIndex].options[
              currentOptionIndex
            ] = {
              ...newChangedQuestion[curChangeQuestionIndex].options[
                currentOptionIndex
              ],
              [nameOption]: nameOption === "isCorrect" ? isChecked : value,
            };
          }
        } else {
          if (nameOption === "isCorrect") {
            newChangedQuestion[curChangeQuestionIndex].options.forEach(
              (option) => {
                option.isCorrect = false;
              }
            );
          }

          newChangedQuestion[curChangeQuestionIndex].options[optionIndex] = {
            ...newChangedQuestion[curChangeQuestionIndex].options[optionIndex],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        }
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
