"use client";

import { useState } from "react";

//* 스토리 작성 폼
const StoryWriter = () => {
  const [story, setStory] = useState<string>("");
  const [pages, setPages] = useState<number>();

  return (
    <div className="flex flex-col w-full px-2">
      <section className="flex-1 flex flex-col border border-gray-300 rounded-md p-5 space-y-2">
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="flex-1 border border-purple-300 rounded-md p-2"
          placeholder="이야기를 작성해주세요"
        />

        <select
          name=""
          id=""
          onChange={(e) => setPages(Number(e.target.value))}
          className="w-full border border-purple-300 rounded-md p-2"
        >
          <option value="">페이지 수를 정해주세요</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1} 페이지
            </option>
          ))}
        </select>

        <button
          className="disabled:bg-gray-400 disabled:cursor-not-allowed w-full bg-purple-500 text-white hover:bg-purple-600 rounded-md p-2 cursor-pointer"
          disabled={!story || !pages}
        >
          스토리 생성하기
        </button>
      </section>

      {/* progress */}
      <section className="flex-1 pb-5 mt-5"></section>
    </div>
  );
};

export default StoryWriter;
