import { UpdateQuestion } from "@/domain/entities/PracticeTest";
import React from "react";

interface Data {
  question: UpdateQuestion;
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
}

export default function TrueFalse({
  question,
  questionIndex,
  handleQuestionChange,
}: Data) {
  return (
    <>
      {/* Question options */}
      <div className="mt-3 flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          return (
            <div key={optionIndex} className="flex items-center gap-3">
              <label className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                <input
                  type="radio"
                  data-section="options"
                  tabIndex={-1}
                  id={`isCorrect-${optionIndex}`}
                  name={`isCorrect-${questionIndex}`}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  onChange={(e) =>
                    handleQuestionChange(
                      e,
                      question.id,
                      questionIndex,
                      "TRUE_FALSE",
                      option.id,
                      optionIndex
                    )
                  }
                />
              </label>

              <label className="w-full" htmlFor={`isCorrect-${optionIndex}`}>
                {option.text}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
