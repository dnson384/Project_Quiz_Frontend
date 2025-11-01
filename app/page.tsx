"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import learn_default_page from "../public/learn_default_page.png";
import flashcard_default_page from "../public/flashcard_default_page.png";
import test_default_page from "../public/test_default_page.png";
import card_matching_default_page from "../public/card_matching_default_page.png";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchInputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <main className="bg-gray-100 h-screen">
      {/* Nav bar */}
      <nav className="flex justify-between items-center px-6 py-3 bg-white">
        {/* Menu */}
        <div id="menu" className="flex items-center gap-10">
          <h1 className="text-3xl font-bold text-indigo-500 cursor-pointer select-none">
            Quizlet
          </h1>
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <h3 className="font-semibold text-sm">Công cụ học</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m19 9l-7 6l-7-6"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <h3 className="font-semibold text-sm">Chủ đề</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m19 9l-7 6l-7-6"
              />
            </svg>
          </div>
        </div>

        {/* Tìm kiếm */}
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

        {/* Đăng ký, đăng nhập */}
        <div className="flex gap-3">
          <button className="w-[120px] py-1.5 px-3 border-2 border-indigo-500 rounded-full cursor-pointer text-indigo-500 font-bold">
            Đăng ký
          </button>
          <button className="w-[120px] py-1.5 px-3 border-2 bg-indigo-500 border-indigo-500 rounded-full cursor-pointer text-white font-bold hover:bg-indigo-700">
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* Slogan */}
      <div className="pt-20">
        <div className="flex flex-col items-center gap-3">
          <h1 className="w-2xl text-4xl font-bold text-center">
            Bạn muốn học như thế nào?
          </h1>
          <p className="text-center text-xl w-2xl">
            Nắm vững kiến thức đang học với thẻ ghi nhớ tương tác, bài kiểm tra
            thử và hoạt động học tập của Quizlet.
          </p>
        </div>
      </div>

      {/* Main features */}
      <div id="main_features_container" className="pt-20 grid grid-cols-4 gap-8 mx-auto w-7xl">
        <div className="pt-5 rounded-3xl bg-sky-300 transform transition duration-300 hover:scale-110 cursor-pointer">
          <h1 className="text-2xl font-bold text-center text-black">Học</h1>
          <Image src={learn_default_page} alt="learn" className="rounded-e-3xl"></Image>
        </div>
        <div className="pt-5 rounded-3xl bg-indigo-600 transform transition duration-300 hover:scale-110 cursor-pointer">
          <h1 className="text-2xl font-bold text-center text-white">Thẻ ghi nhớ</h1>
          <Image src={flashcard_default_page} alt="learn" className="rounded-e-3xl overflow-hidden"></Image>
        </div>
        <div className="pt-5 rounded-3xl bg-amber-300 transform transition duration-300 hover:scale-110 cursor-pointer">
          <h1 className="text-2xl font-bold text-center text-black">Kiểm tra</h1>
          <Image src={test_default_page} alt="learn" className="rounded-e-3xl"></Image>
        </div>
        <div className="pt-5 rounded-3xl bg-rose-300 transform transition duration-300 hover:scale-110 cursor-pointer">
          <h1 className="text-2xl font-bold text-center text-black">Ghép thẻ</h1>
          <Image src={card_matching_default_page} alt="learn" className="rounded-e-3xl"></Image>
        </div>
      </div>
    </main>
  );
}
