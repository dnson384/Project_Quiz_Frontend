"use client";
import CourseCard from "@/components/course_card";

interface CourseData {
  courses: Array<any>;
  handleLoadMoreResults: () => void;
  notification: string | null;
}

export default function CourseResult({
  courses,
  handleLoadMoreResults,
  notification,
}: CourseData) {
  return (
    <>
      {/* Học phần */}
      {courses && (
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {courses.map((course) => (
              <CourseCard
                key={course.course_id}
                courseName={course.course_name}
                termCount={course.num_of_terms}
                authorName={course.author_username}
                authorRole={course.author_role}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {notification ? (
              <p className="font-medium">{notification}</p>
            ) : (
              <button
                className="font-medium bg-indigo-50 w-fit py-3 px-6 rounded-xl cursor-pointer hover:bg-indigo-500 hover:text-white"
                onClick={() => handleLoadMoreResults()}
              >
                Tải thêm
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
