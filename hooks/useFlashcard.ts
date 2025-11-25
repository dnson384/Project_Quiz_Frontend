import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFlashcard() {
  const [currentTerm, setCurrentTerm] = useState<number>(1);
  const [canBack, setCanBack] = useState<boolean>(false);
  const [canForward, setCanForward] = useState<boolean>(true);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [rotateX, setRotateX] = useState<number>(0);
  const [numOfTerms, setNumOfTerms] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFlashcardClick = () => {
    if (!isResetting) {
      setRotateX((prev) => prev + 180);
    }
  };

  const handleFlashcardSlider = (direction: string) => {
    if (direction === "back") {
      setDirection(-1);
      setCurrentTerm((prev) => prev - 1);
    } else if (direction === "forward") {
      setDirection(1);
      setCurrentTerm((prev) => prev + 1);
    }
  };

  const isLatinText = (text: string): boolean => {
    if (!text) return false;

    // Regex này bao gồm:
    // a-zA-Z: Chữ cái tiếng Anh cơ bản
    // \u00C0-\u00FF: Latin-1 Supplement (các ký tự cơ bản có dấu)
    // \u0100-\u017F: Latin Extended-A
    // \u0180-\u024F: Latin Extended-B
    // \u1E00-\u1EFF: Latin Extended Additional (Quan trọng cho tiếng Việt đầy đủ dấu)
    const latinRegex =
      /[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]/;

    return latinRegex.test(text);
  };

  useEffect(() => {
    const currentTerm = Number(searchParams.get("currentTerm"));
    if (currentTerm) {
      setCurrentTerm(currentTerm);
    }
  }, []);

  const handleCloseBtnClick = (courseName: string) => {
    const courseId = searchParams.get("uuid");
    const courseNameArr = courseName.replace(/[^a-zA-z0-1\s]/g, "").split(" ");

    // Tạo slug URL
    let slugArr: Array<any> = [];
    courseNameArr.forEach((word: string) => {
      if (word) {
        slugArr.push(word);
      }
    });
    const slug = slugArr.join("-");

    // Điều hướng sang xem chi tiết học phần
    const newPathname = `/course/${slug}?uuid=${courseId}`;
    router.push(newPathname);
  };

  useEffect(() => {
    setIsResetting(true);
    setRotateX(0);

    const timer = setTimeout(() => {
      setIsResetting(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentTerm]);

  useEffect(() => {
    if (numOfTerms === 0) return;

    if (currentTerm <= 1) {
      setCanBack(false);
      setCanForward(numOfTerms > 1);
    } else if (currentTerm >= numOfTerms) {
      setCanBack(true);
      setCanForward(false);
    } else {
      setCanBack(true);
      setCanForward(true);
    }
  }, [currentTerm, numOfTerms]);

  return {
    canBack,
    canForward,
    currentTerm,
    rotateX,
    isResetting,
    direction,
    setNumOfTerms,
    handleFlashcardClick,
    handleFlashcardSlider,
    isLatinText,
    handleCloseBtnClick,
  };
}
