"use client"
import { PracticeTest } from "@/domain/entities/PracticeTest";
import { useAuthContext } from "@/presentation/context/authContext";
import { getAllHistories } from "@/presentation/services/practice_test.service";
import { useEffect, useState } from "react";

export default function useAllHistory() {
  const { user } = useAuthContext();
  const [histories, setHistories] = useState<PracticeTest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllHistories();
      if (response) {
        setHistories(response.data);
      }
    };
    fetchData();
  }, [user]);
  return {histories};
}
