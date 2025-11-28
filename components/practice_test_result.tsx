"use client";
interface AnswerOptionData {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface PracticeTestQuestionData {
  questionIndex: number;
  questionText: string;
  selectedId: string;
  answerOptions: AnswerOptionData[];
}

export default function PracticeTestAnswerResult({
  questionIndex,
  questionText,
  selectedId,
  answerOptions,
}: PracticeTestQuestionData) {
  return (
    <div className="flex items-start">
      <p className="min-w-10 text-lg">{questionIndex + 1}.</p>
      <div>
        <p className="mb-1 text-lg">{questionText}</p>
        <div className="flex flex-col gap-1">
          {answerOptions.map((option) => (
            <div key={option.option_id} className="flex items-center gap-4">
              <input
                type="radio"
                className="accent-indigo-700 w-4 h-4"
                checked={selectedId === option.option_id}
                readOnly
              />
              <label className="text-lg w-full">{option.option_text}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
