import { useState } from "react";

export default function useSideMenu() {
  const [selectedPage, setSelectedPage] = useState<string>("create_flashcard");

  const handleMenuItem = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement;
    setSelectedPage(target.id);
  };

  return{
    selectedPage,
    handleMenuItem
  }
}
