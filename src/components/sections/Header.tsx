import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className=" fixed z-50 flex h-[60px] w-full items-center  justify-center border-b-[0.5px] border-neutral-300 text-black">
        <div className="flex w-full flex-row items-center justify-start gap-10 p-2 pl-5">
          <Link to="/">Home</Link>
          <Link to="/builder">Flow Builder</Link>
          <Link to="/experiment">Experiment...</Link>
        </div>
      </header>
    </>
  );
}
