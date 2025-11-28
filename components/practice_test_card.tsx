"use client";
import Image from "next/image";
import owlAvatar from "../public/avatar_icon/owl.jpg";
import usePracticeTestCard from "@/hooks/PracticeTest/usePracticeTestCard";

interface PracticeTestData {
  practiceTestId: string;
  practiceTestName: string;
  authorName: string;
}

export default function PracticeTestCard({
  practiceTestId,
  practiceTestName,
  authorName,
}: PracticeTestData) {
  const { handleCardClick } = usePracticeTestCard();

  return (
    <main
      className="border border-gray-300 p-5 rounded-xl w-xs cursor-pointer hover:shadow-md shadow-indigo-300"
      onClick={() => handleCardClick(practiceTestId, practiceTestName)}
    >
      <div className="flex flex-col gap-3 mb-8">
        {/* Tên bài test */}
        <h2 className="font-bold hover:text-indigo-700">{practiceTestName}</h2>
      </div>

      {/* Tác giả */}
      <div className="flex gap-2">
        {/* Avatar */}
        <Image
          src={owlAvatar}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        ></Image>
        {/* Username */}
        <p className="text-gray-700 font-bold">{authorName}</p>
      </div>
    </main>
  );
}
