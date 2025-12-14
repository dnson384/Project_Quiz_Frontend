"use client";
import React, { useState, useEffect } from "react";
import {
  NewBaseInfo,
  NewQuestion,
  Option,
  NewPracticeTest,
} from "@/domain/entities/PracticeTest";

export default function useCreatePracticeTest() {
  const getNewOption = (): Option => ({ text: "", isCorrect: false });
  const getNewQuestion = (): NewQuestion => ({
    questionBase: {
      text: "",
      type: "SINGLE_CHOICE",
    },
    options: Array.from({ length: 4 }, () => getNewOption()),
  });

  const [baseInfo, setBaseInfo] = useState<NewBaseInfo>({ name: "" });
  const [questions, setQuestions] = useState<NewQuestion[]>(
    Array.from({ length: 2 }, () => getNewQuestion())
  );

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleAddCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.push(getNewQuestion());
      return newQuestions;
    });
  };

  const handleDeleteCard = (questionIndex: number) => {
    setIsSubmitted(false);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.splice(questionIndex, 1);
      return newQuestions;
    });
  };

  const handleAddOption = (questionIndex: number) => {
    setIsSubmitted(false);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [
          ...newQuestions[questionIndex].options,
          { text: "", isCorrect: false },
        ],
      };
      return newQuestions;
    });
  };

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    setIsSubmitted(false);
    console.log(questions[questionIndex].options.length);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newQuestions[questionIndex].options.filter(
          (_, index) => index !== optionIndex
        ),
      };
      return newQuestions;
    });
  };

  // Input
  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);
    const { value } = event.target;
    setBaseInfo({ name: value });
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    questionIndex: number,
    optionIndex: number | null,
    questionType: string | null
  ) => {
    setIsSubmitted(false);
    const target = event.target;
    const section = event.target.dataset.section;

    const { name, value } = target;
    setQuestions((prev) => {
      const newQuestions = [...prev];
      while (questionIndex >= newQuestions.length) {
        newQuestions.push(getNewQuestion());
      }

      // Thay doi questionBase
      if (section === "questionBase") {
        const currentType = newQuestions[questionIndex].questionBase.type;
        if (name === "type") {
          if (
            value === "TRUE_FALSE" &&
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(currentType)
          ) {
            newQuestions[questionIndex].options = [
              { text: "Đúng", isCorrect: false },
              { text: "Sai", isCorrect: false },
            ];
          } else if (
            currentType === "TRUE_FALSE" &&
            ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(value)
          ) {
            newQuestions[questionIndex].options = Array.from(
              { length: 4 },
              () => getNewOption()
            );
          }
        }
        newQuestions[questionIndex].questionBase = {
          ...newQuestions[questionIndex].questionBase,
          [name]: value,
        };
      }
      // Thay doi options
      else if (section === "options" && optionIndex !== null) {
        while (optionIndex >= newQuestions[questionIndex].options.length) {
          newQuestions[questionIndex].options.push({
            text: "",
            isCorrect: false,
          });
        }

        const nameOption = name.split("-")[0];
        const isChecked = (target as HTMLInputElement).checked;

        if (questionType === "MULTIPLE_CHOICE") {
          newQuestions[questionIndex].options[optionIndex] = {
            ...newQuestions[questionIndex].options[optionIndex],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        } else {
          if (nameOption === "isCorrect" && value == "on") {
            newQuestions[questionIndex].options.forEach((option) => {
              option.isCorrect = false;
            });
          }

          newQuestions[questionIndex].options[optionIndex] = {
            ...newQuestions[questionIndex].options[optionIndex],
            [nameOption]: nameOption === "isCorrect" ? isChecked : value,
          };
        }
      }
      return newQuestions;
    });
  };

  // Submit
  const handleCreateClick = (valid: boolean) => {
    setIsSubmitted(true);
    if (valid) {
      const newPracticeTest = {
        baseInfo: baseInfo,
        questions: questions,
      };
      console.log(newPracticeTest);
    }
  };

  return {
    // UI
    isSubmitted,
    // FieldData
    baseInfo,
    questions,
    // Card
    handleAddCartClick,
    handleDeleteCard,
    handleAddOption,
    handleDeleteOption,
    // Input
    handleBaseInfoChange,
    handleQuestionChange,
    // Submit
    handleCreateClick,
  };
}
