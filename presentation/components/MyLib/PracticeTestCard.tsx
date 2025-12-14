"use client";
interface PracticeTestData {
  practiceTestId: string;
  practiceTestName: string;
}

export default function PracticeTestCard({
  practiceTestId,
  practiceTestName,
}: PracticeTestData) {
  return (
    <main
      className="border border-gray-300 px-5 py-3 rounded-md w-full cursor-pointer hover:shadow-md shadow-indigo-300"
      // onClick={() => handleCardClick(practiceTestId, practiceTestName)}
    >
      {/* Thông tin học phân */}
      <div className="flex flex-col gap-1">
        {/* Tên học phần */}
        <h2 className="font-bold hover:text-indigo-700">{practiceTestName}</h2>
      </div>
    </main>
  );
}
