import { useSearchParams } from "next/navigation";
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

  return { courseDetail };
}
