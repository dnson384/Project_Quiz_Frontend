"use client";
import { ResultWithPracticeTest } from "@/domain/entities/Result";
import { useAuthContext } from "@/presentation/context/authContext";
import { getAllHistories } from "@/presentation/services/practice_test.service";
import { useEffect, useState } from "react";

export default function useAllHistory() {
  const { user } = useAuthContext();
  const [histories, setHistories] = useState<ResultWithPracticeTest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllHistories();
      if (response) {
        setHistories(response.data);
      }
    };
    fetchData();
  }, [user]);
  return { user, histories };
}
