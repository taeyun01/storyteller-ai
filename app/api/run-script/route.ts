import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptIstance";

const script = "app/api/run-script/story-book.gpt";

export async function POST(request: NextRequest) {
  const { story, pages, path } = await request.json();

  console.log(story, pages, path);

  const opts: RunOpts = {
    disableCache: true, // 캐시 비활성화 (최신데이터만 사용)
    // Example CLI command: gptscript ./story-book.gpt --story "A robot and a human become friends(로봇과 인간이 친구가 됩니다)" --pages 5 --path ./stories
    input: `--story ${story} --pages ${pages} --path ${path}`,
  };

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const run = await g.run(script, opts);
          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });

          await run.text();
          controller.close();
        } catch (error) {
          controller.error(error);
          console.error("Error", error);
        }
      },
    });

    return new Response(stream, {
      // 헤더를 사용하여 콘텐츠 전달
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
