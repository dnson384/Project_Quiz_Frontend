"use client";
interface AnswerOptionData {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface PracticeTestQuestionData {
  questionIndex: number;
  questionText: string;
  answerOptions: AnswerOptionData[];
  handleOptionSelected: (
    questionIndex: number,
    option: AnswerOptionData
  ) => void;
}

export default function PracticeTestQuestion({
  questionIndex,
  questionText,
  answerOptions,
  handleOptionSelected,
}: PracticeTestQuestionData) {
  return (
    <div className="flex items-start">
      <p className="min-w-10 text-lg">{questionIndex + 1}.</p>
      <div>
        <p className="mb-1 text-lg">{questionText}</p>
        <div className="flex flex-col gap-1">
          {answerOptions.map((option, index) => (
            <div key={option.option_id} className="flex items-center gap-4">
              <input
                type="radio"
                name={`question-${questionIndex + 1}`}
                id={`option-${questionIndex + 1}-${index}`}
                className="accent-indigo-700 w-4 h-4"
                onChange={() => handleOptionSelected(questionIndex, option)}
              />
              <label
                htmlFor={`option-${questionIndex + 1}-${index}`}
                className="text-lg w-full"
              >
                {option.option_text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
