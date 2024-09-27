import Link from "next/link";

const Header = () => {
  return (
    <header className="relative p-16 text-center">
      <Link href="/">
        <h1 className="text-4xl font-bold mb-1 lg:mb-3 lg:text-5xl">
          스토리 텔링 AI 프로젝트
        </h1>
        <div className="flex justify-center whitespace-nowrap space-x-2 text-xl lg:space-x-4 lg:text-2xl">
          <h2>당신의 이야기를 들려주세요!</h2>
          <div className="relative">
            <div className="bg-purple-500 -rotate-3">
              <p className="relative text-white px-2">To life!</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Nav icons */}
      <div className="absolute -top-5 right-5 flex space-x-2">
        <Link href="/">
          <button className="w-12 lg:w-14 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50">
            파일
          </button>
        </Link>

        <Link href="/stories">
          <button className="w-12 lg:w-14 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50">
            책
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
