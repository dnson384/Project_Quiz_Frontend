"use client";
import Header from "@/components/header";
import SideMenu from "@/components/side_menu";
import useDashboard from "@/hooks/useDashboard";
import CourseCard from "@/components/course_card";

export default function Dashboard() {
  const { courseSample } = useDashboard();
  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />
        {courseSample && (
          <div className="mx-auto">
            <h3 className="font-bold mb-5">Học phần phổ biến</h3>
            <div className="grid grid-cols-3 gap-x-4">
              {courseSample.map((course) => (
                <CourseCard
                  key={course.course_id}
                  courseName={course.course_name}
                  termCount={course.num_of_terms}
                  authorName={course.author_username}
                  authorRole={course.author_role}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
