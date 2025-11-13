import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { SearchByKeyword } from "@/app/api/search/search";

export default function useSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const keyword = searchParams.get("keyword");
  const type = searchParams.get("type");

  const [courses, setCourses] = useState<Array<any>>([]);
  const [practiceTests, setPracticeTests] = useState<Array<any>>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setNotification(null);

    const fetchSearchResult = async () => {
      if (!keyword || !type) return;

      try {
        let result = { courses: [], practice_tests: [] };
        let cursor_id = "";
        switch (type) {
          case "all":
            result = await SearchByKeyword(keyword, type);
            break;
          case "courses":
            cursor_id =
              courses.length > 0
                ? courses[courses.length - 1]["course_id"]
                : null;
            result = await SearchByKeyword(keyword, type, cursor_id);
            break;
          case "practice_tests":
            cursor_id =
              practiceTests.length > 0
                ? practiceTests[practiceTests.length - 1]["practice_test_id"]
                : null;
            result = await SearchByKeyword(keyword, type, cursor_id);
            break;
        }

        setCourses((prev) => [...prev, ...result.courses]);
        setPracticeTests((prev) => [...prev, ...result.practice_tests]);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm:", err);
      }
    };
    fetchSearchResult();
  }, [type]);

  const HandlerShowResult = (
    event: React.MouseEvent<HTMLHeadingElement>,
    type: string | null
  ) => {
    const target = event.target as HTMLElement;
    const newType = target.id;

    if (type === newType) return;

    setPracticeTests([]);
    setCourses([]);

    const newUrl = `${pathname}?keyword=${keyword}&type=${newType}`;
    router.push(newUrl);
  };

  const handleLoadMoreResults = async () => {
    if (!keyword || !type) return;

    let cursor_id = null;
    switch (type) {
      case "courses":
        cursor_id = courses[courses.length - 1]["course_id"];
        break;
      case "practice_tests":
        cursor_id = practiceTests[practiceTests.length - 1]["practice_test_id"];
        break;
    }

    try {
      const response = await SearchByKeyword(keyword, type, cursor_id);

      if (
        (response.courses.length == 0 && type === "courses") ||
        (response.practice_tests.length == 0 && type === "practice_tests")
      ) {
        setNotification("Bạn đã xem hết tất cả kết quả.");
        return;
      }

      setCourses((prev) => [...prev, ...response.courses]);
      setPracticeTests((prev) => [...prev, ...response.practice_tests]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewAllResult = (type: string) => {
    setPracticeTests([]);
    setCourses([]);
    const newUrl = `${pathname}?keyword=${keyword}&type=${type}`;
    router.push(newUrl);
  };

  return {
    keyword,
    type,
    courses,
    practiceTests,
    notification,
    HandlerShowResult,
    handleLoadMoreResults,
    handleViewAllResult,
  };
}
