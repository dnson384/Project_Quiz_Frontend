import { useRef, useState } from "react";

import Image from "next/image";
import owlAvatar from "../public/avatar_icon/owl.jpg";

import { useShowFullMenu } from "@/store/dashboard";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showFullMenu = useShowFullMenu((state) => state.showFullMenu);
  const setShowFullMenu = useShowFullMenu((state) => state.setShowFullMenu);

  const handleSearchInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleMenuIcon = () => {
    setShowFullMenu(!showFullMenu);
  };
  
  return (
    <nav className="pl-4 pr-6 py-4 flex justify-between items-center">
      {/* Menu & Logo */}
      <div className="flex items-center gap-3">
        <div
          className="p-2 cursor-pointer hover:bg-gray-200 hover:rounded-full"
          onClick={handleMenuIcon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="#2b303e"
                d="M20 18a1 1 0 0 1 .117 1.993L20 20H4a1 1 0 0 1-.117-1.993L4 18zm0-7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0-7a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </g>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-indigo-500 select-none cursor-pointer">
          Quizz
        </h1>
      </div>

      {/* Search bar */}
      <div
        id="search-container"
        // className="w-2xl bg-[#F6F7FB] py-2 px-4 rounded-lg flex items-center gap-2"
        className={`w-2xl bg-[#F6F7FB] py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 border ${
          isFocused ? "border-indigo-500" : "border-transparent"
        }`}
        onClick={handleSearchInputFocus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#2b303e"
            d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"
          />
        </svg>
        <input
          id="search-bar"
          className="w-full focus:outline-0"
          type="text"
          placeholder="Tìm thẻ ghi nhớ"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {/* Create course & Account */}
      <div className="flex gap-3">
        {/* Create */}
        <div className="bg-indigo-500 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-indigo-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              fill="#ffffff"
              d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"
            />
          </svg>
        </div>

        {/* Accout */}
        <div>
          <Image
            src={owlAvatar}
            alt="avatar"
            className="w-10 h-10  rounded-full cursor-pointer"
          ></Image>
        </div>
      </div>
    </nav>
  );
}
