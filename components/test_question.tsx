interface QuestionData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface OptionsData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface LearnQuestionParams {
  questionIndex: number;
  currentQuestion: OptionsData[];
  correctAnswer: QuestionData;
  selectedOption: string | null;
  handleOptionSelected: (
    questionIndex: number,
    option_id: string,
    correct_id: string
  ) => void;
}

export default function TestQuestion({
  questionIndex,
  currentQuestion,
  correctAnswer,
  selectedOption,
  handleOptionSelected,
}: LearnQuestionParams) {
  return (
    <section className="w-5xl mx-auto px-7 py-5 border border-gray-300 rounded-lg">
      {/* Term */}
      <div className="mb-16">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold text-gray-500 mb-6">Định nghĩa</h4>
          <h3 className="text-sm text-gray-500">{questionIndex + 1}/20</h3>
        </div>
        <p className="text-xl font-semibold">{correctAnswer.term}</p>
      </div>

      {/* Options */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-5">
          Chọn đáp án đúng
        </h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 select-none">
          {currentQuestion &&
            currentQuestion.map((option) => (
              <div
                key={option.course_detail_id}
                onClick={() =>
                  handleOptionSelected(
                    questionIndex,
                    option.course_detail_id,
                    correctAnswer.course_detail_id
                  )
                }
                className={`flex items-center border rounded-md cursor-pointer mb-3 transition-all duration-200  ${
                  selectedOption === option.course_detail_id
                    ? "border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                } `}
              >
                <div className="flex items-center gap-4 px-4 py-3 w-full">
                  <p className="text-gray-700 font-medium">
                    {option.definition}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
