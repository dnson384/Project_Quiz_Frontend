import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useShowFullMenu } from "@/store/dashboard";

export default function useNavigationBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showFullMenu = useShowFullMenu((state) => state.showFullMenu);
  const setShowFullMenu = useShowFullMenu((state) => state.setShowFullMenu);

  const pathname = usePathname();
  const router = useRouter();

  const handleSearchInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleMenuIcon = () => {
    setShowFullMenu(!showFullMenu);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
  };

  const handleSubmitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keyword) {
      router.push(`/search?keyword=${keyword}&type=all`);
    } else {
      console.log("blank");
    }

    setKeyword(null);
    inputRef.current?.blur();
    setIsFocused(false);
  };

  const handleLogoClick = () => {
    if (pathname.toString().includes("dashboard")) return;
    router.push("/dashboard");
  };
  return {
    isFocused,
    keyword,
    inputRef,
    setIsFocused,
    handleMenuIcon,
    handleSearchInputFocus,
    handleSearchInputChange,
    handleSubmitSearchForm,
    handleLogoClick,
  };
}
