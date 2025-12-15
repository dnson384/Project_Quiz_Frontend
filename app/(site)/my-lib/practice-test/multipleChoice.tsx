import { UpdateQuestion } from "@/domain/entities/PracticeTest";
import React from "react";

interface Data {
  question: UpdateQuestion;
  isSubmitted: boolean;
  questionIndex: number;
  handleQuestionChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    questionId: string | null,
    index: number,
    type: string,
    optionId: string | null,
    optionIndex: number | null
  ) => void;
  handleDeleteOption: (
    questionId: string | null,
    optionId: string | null,
    questionTempId?: string,
    newQuestionIndex?: number,
    optionTempId?: string,
    newOptionIndex?: number
  ) => void;
}

export default function MultipleChoice({
  question,
  isSubmitted,
  questionIndex,
  handleQuestionChange,
  handleDeleteOption,
}: Data) {
  return (
    <>
      {/* Question options */}
      <div className="mt-3 flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          const isMissingOptionText =
            option && (option?.text || "").trim().length > 0 ? false : true;

          return (
            <div key={option.id ? option.id : option.tempId}>
              <div className="flex items-center gap-2">
                <label className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    data-section="options"
                    tabIndex={-1}
                    name={`isCorrect-${questionIndex}`}
                    className="w-4 h-4 accent-indigo-500 cursor-pointer"
                    defaultChecked={option.isCorrect}
                    onChange={(e) => {
                      handleQuestionChange(
                        e,
                        question.id,
                        questionIndex,
                        "MULTIPLE_CHOICE",
                        option.id,
                        optionIndex
                      );
                    }}
                  />
                </label>
                <input
                  type="text"
                  data-section="options"
                  name={`text-${questionIndex}`}
                  defaultValue={option.text}
                  className={`w-full px-3 py-1 border-b-2 ${
                    isMissingOptionText && isSubmitted
                      ? "border-red-500 bg-red-50 focus:outline-red-500"
                      : "border-gray-200"
                  } focus:outline-0`}
                  placeholder="Phương án trả lời"
                  onBlur={(e) => {
                    handleQuestionChange(
                      e,
                      question.id,
                      questionIndex,
                      "MULTIPLE_CHOICE",
                      option.id,
                      optionIndex
                    );
                  }}
                />
                <div
                  className={`p-1 ${
                    question.options.length > 2
                      ? "cursor-pointer"
                      : "pointer-events-none"
                  }`}
                  onClick={() => {
                    if (question.id === null && option.id === null) {
                      handleDeleteOption(
                        question.id,
                        option.id,
                        question.tempId,
                        questionIndex,
                        option.tempId,
                        optionIndex
                      );
                    } else {
                      handleDeleteOption(question.id, option.id);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke={
                        question.options.length > 2 ? "#374151" : "#9CA3AF"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 12h14"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
