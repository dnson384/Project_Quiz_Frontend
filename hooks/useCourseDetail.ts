import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseDetail } from "@/services/course";

interface CourseData {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface DetailData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface CourseDetailData {
  course: CourseData;
  course_detail: DetailData[];
}

export default function useCourseDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courseDetail, setCourseDetail] = useState<CourseDetailData | null>(
    null
  );

  const courseId = searchParams.get("uuid");
  useEffect(() => {
    (async () => {
      if (!courseId) {
        return;
      }

      try {
        const response = await getCourseDetail(courseId);
        setCourseDetail(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [courseId]);

  const handleLearnFlashcardClick = (
    course_id: string,
    currentTerm: number
  ) => {
    const newURL = `/course/flashcard?uuid=${course_id}&currentTerm=${currentTerm}`;
    router.push(newURL);
  };

  const handleLearnClick = (course_id: string) => {
    const newURL = `/course/learn?uuid=${course_id}`;
    router.push(newURL);
  };

  const handleTestClick = (course_id: string) => {
    const newURL = `/course/test?uuid=${course_id}`;
    router.push(newURL);
  };

  return {
    courseDetail,
    handleLearnFlashcardClick,
    handleLearnClick,
    handleTestClick,
  };
}
