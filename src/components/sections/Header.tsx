import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className=" z-50 flex h-[60px] w-full items-center  justify-center border-b-[0.5px] border-neutral-300 bg-black text-white shadow-md">
        <div className="flex w-full max-w-screen-2xl flex-row items-center justify-start gap-10 p-2 pl-5 text-black">
          <Link className="text-white hover:text-white hover:underline" to="/">
            Home
          </Link>
          <Link
            className=" text-white hover:text-white hover:underline"
            to="/builder"
          >
            Flow Builder
          </Link>
          <Link
            className="text-white hover:text-white hover:underline"
            to="/experiment"
          >
            Experiment...
          </Link>
        </div>
      </header>
    </>
  );
}
