import Link from "next/link";

const Header = () => {
  return (
    <header className="relative p-16 text-center">
      <Link href="/">
        <h1 className="text-4xl font-bold lg:text-6xl">스토리 텔링 AI</h1>
        <div className="flex justify-center whitespace-nowrap space-x-1 text-2xl lg:space-x-4 lg:text-4xl">
          <h2>당신의 이야기를 들려주세요!</h2>
          <div className="relative">
            <div className="bg-purple-500 -rotate-1">
              <p className="relative text-white">To life!</p>
            </div>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
