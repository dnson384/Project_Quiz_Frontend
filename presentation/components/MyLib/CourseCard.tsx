"use client";
import Image from "next/image";
import okAvatar from "../../../public/avatar_icon/ok.jpg";

interface CourseData {
  courseId: string;
  courseName: string;
  termCount: number;
}

export default function CourseCard({
  courseId,
  courseName,
  termCount,
}: CourseData) {
  return (
    <main
      className="border border-gray-300 px-5 py-3 rounded-md w-full cursor-pointer hover:shadow-md shadow-indigo-300"
      // onClick={() => handleCardClick(courseId, courseName)}
    >
      {/* Thông tin học phân */}
      <div className="flex flex-col gap-1">
        {/* Tổng số thuật ngữ */}
        <div className="w-fit flex gap-2 items-center py-1 ">
          <p className="text-sm text-gray-700 font-bold">
            {termCount} thuật ngữ
          </p>
        </div>
        {/* Tên học phần */}
        <h2 className="font-bold hover:text-indigo-700">{courseName}</h2>
      </div>
    </main>
  );
}
