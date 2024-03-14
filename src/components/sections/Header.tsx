import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className=" fixed z-50 flex h-[60px] w-full items-center  justify-center border-b-[0.5px] border-neutral-300 bg-zinc-400 text-black shadow-md">
        <div className="flex w-full max-w-screen-2xl flex-row items-center justify-start gap-10 p-2 pl-5 text-black">
          <Link className="text-black hover:text-black hover:underline" to="/">
            Home
          </Link>
          <Link
            className=" text-black hover:text-black hover:underline"
            to="/builder"
          >
            Flow Builder
          </Link>
          <Link
            className="text-black hover:text-black hover:underline"
            to="/experiment"
          >
            Experiment...
          </Link>
        </div>
      </header>
    </>
  );
}
