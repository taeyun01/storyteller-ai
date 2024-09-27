import Image from "next/image";
import logo from "@/images/logo.png";
import Link from "next/link";
import StoryWriter from "@/components/ui/StoryWriter";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center bg-purple-500 pb-10 order-1 lg:-order-1">
          <Image src={logo} alt="logo" height={250} />
          <button className="px-20 py-5 text-xl bg-purple-700 hover:bg-purple-900 text-white rounded">
            <Link href="/stories">스토리 둘러보기</Link>
          </button>
        </div>

        {/* StoryWriter */}
        <StoryWriter />
      </section>
      <h1>AI Agent GPTScript build!</h1>
    </div>
  );
}
