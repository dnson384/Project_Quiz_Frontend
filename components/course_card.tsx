"use client";
import Image from "next/image";
import owlAvatar from "../public/avatar_icon/owl.jpg";

interface CourseData {
  courseName: string;
  termCount: number;
  authorName: string;
  authorRole: string;
}

export default function CourseCard({
  courseName,
  termCount,
  authorName,
  authorRole,
}: CourseData) {
  let role = authorRole;
  switch (authorName) {
    case "ADMIN":
      role = "Quản trị viên";
      break;
    case "STUDENT":
      role = "Học sinh / Sinh viên";
      break;
    case "TEACHER":
      role = "Giáo viên";
      break;
  }

  return (
    <main className="border border-gray-300 p-5 rounded-xl w-xs cursor-pointer hover:shadow-md shadow-indigo-300">
      <div className="flex flex-col gap-3 mb-8">
        {/* Tên học phần */}
        <h2 className="font-bold hover:text-indigo-700">{courseName}</h2>

        {/* Tổng số thuật ngữ */}
        <div className="w-fit flex gap-2 items-center py-1 px-2 rounded-full bg-indigo-50">
          <p className="text-xs text-gray-700 font-bold">
            {termCount} thuật ngữ
          </p>
        </div>
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
        {/* Role */}
        <div className="w-fit flex gap-2 items-center py-1 px-2 rounded-full bg-indigo-50">
          <p className="text-xs text-gray-700 font-bold">{role}</p>
        </div>
      </div>
    </main>
  );
}
