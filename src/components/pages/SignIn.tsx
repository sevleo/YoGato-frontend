import { Link } from "react-router-dom";
import { LogInForm } from "../sections/LoginPopUp";

export default function SignIn() {
  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex w-4/12 min-w-[400px] flex-1 shrink-0 flex-col border-r-[0.5px] border-[#323232] bg-[#1c1c1c] ">
          <div className="h-[60px] p-5">
            <Link
              className=" flex h-full w-[100px] items-center justify-center text-[25px] font-bold text-[#6ccc93]  hover:text-[#6ccc93]"
              to="/"
            >
              YoGato
            </Link>
          </div>
          <div className="mb-auto mt-auto">
            <LogInForm type="page"></LogInForm>
          </div>
          <div className="mt-auto">
            {" "}
            <p className=" pb-2 pt-2 text-[10px] font-normal text-[#c9c9c9]">
              YoGato @ 2024
            </p>
          </div>
        </div>
        <div className="w-8/12 bg-[#161616]"></div>
      </div>
    </>
  );
}
