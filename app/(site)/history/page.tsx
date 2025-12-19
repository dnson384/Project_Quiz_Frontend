"use client"
import useAllHistory from "@/presentation/hooks/History/useAllHistory";

export default function AllHistories() {
  const { histories } = useAllHistory();
  console.log(histories);
  return <></>;
}
