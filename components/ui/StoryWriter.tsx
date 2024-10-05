"use client";

import { Frame } from "@gptscript-ai/gptscript";
import { useState } from "react";

const storiesPath = "public/stories";

//* 스토리 작성 폼
const StoryWriter = () => {
  const [story, setStory] = useState<string>("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState("");
  const [runStarted, setRunStarted] = useState<boolean>(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState("");
  const [events, setEvents] = useState<Frame[]>([]);

  const handleStream = async (
    reader: ReadableStreamReader<Uint8Array>,
    decoder: TextDecoder
  ) => {
    // API에서 스트림 관리
    while (true) {
      const { done, value } = await reader.read();

      if (done) break; // breaks out of the infinite loop

      const chunk = decoder.decode(value, { stream: true });

      // 청크를 event 키워드로 분할하여 이벤트로 분할합니다
      const eventData = chunk
        .split("\n\n")
        .filter((line) => line.startsWith("event: "))
        .map((line) => line.replace(/^event: /, ""));

      console.log(eventData);

      eventData.forEach((event) => {
        try {
          const parsedData = JSON.parse(event);
          console.log(parsedData); // 콘솔로 확인하여 43번줄 해석

          if (parsedData.type === "callProgress") {
            setProgress(
              parsedData.output[parsedData.output.length - 1].content
            );
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "callStart") {
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "runFinish") {
            setRunFinished(true);
            setRunStarted(false);
          } else {
            setEvents((prev) => [...prev, parsedData]);
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      });
    }
  };

  const runScript = async () => {
    setRunStarted(true);
    setRunFinished(false);

    const response = await fetch("/api/run-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story, pages, path: storiesPath }),
    });

    if (response.ok && response.body) {
      // Handle streams from the API (API에서 스트림 처리)
      // ...
      console.log("스트리밍 시작!!");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      handleStream(reader, decoder);
    }

    // 스트리밍 실패 시
    setRunFinished(true);
    setRunStarted(false);
    console.error(
      "스트리밍을 시작하지 못했습니다. (Failed to start streaming)"
    );
  };

  return (
    <div className="flex flex-col w-full px-2">
      {/* 스토리 생성 폼 */}
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
          disabled={!story || !pages || runStarted}
          onClick={runScript}
        >
          스토리 생성하기
        </button>
      </section>

      <section className="flex-1 pb-5 mt-5">
        {/* flex-col-reverse로 텍스트가 밑에서 부터 올라오게 만드는 트릭 */}
        <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
          <div>
            {runFinished === null && (
              <>
                <p className="animate-pulse">스토리 생성을 준비중입니다...</p>
                <br />
              </>
            )}
            <span className="mr-5">{">>"} ddd</span>
            {/** progress */}
            {progress}
          </div>

          {/* Current Tool */}
          {currentTool && (
            <div className="py-10">
              <span className="mr-5">{"--- [Current Tool] ---"}</span>
              {currentTool}
            </div>
          )}

          {/* Render Events */}
          {runStarted && (
            <div>
              <span className="mr-5 animate-in">
                {"--- [AI Storyteller Has Started] ---"}
              </span>
              {runStarted}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StoryWriter;
