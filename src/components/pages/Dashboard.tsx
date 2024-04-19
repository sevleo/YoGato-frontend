import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utilities/api";
import { useUser } from "../utilities/UserContext";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { authState, dispatch } = useUser();

  function handleHomeLink() {
    navigate("/");
  }

  function handleLogout() {
    logout(dispatch);
  }

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/sign-in");
    }
  }, [authState.isLoggedIn, navigate]);

  return (
    <div className="flex h-full">
      <div className="w-64 border-r-[0.5px] border-[#323232]" id="sidebar">
        <div className=" flex h-12 max-h-12 items-center justify-start border-b-[1px] border-[#323232] pl-4">
          <Link
            className=" flex h-full w-[100px] items-center justify-center text-[25px] font-bold text-[#6ccc93]  hover:text-[#6ccc93]"
            to="/"
            onClick={handleHomeLink}
          >
            YoGato
          </Link>
        </div>
        <nav>
          <ul>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className="text-start text-sm font-normal text-[#7e7e7e]">
                  Practice
                </p>
              </div>
              <ul className="flex w-full flex-col space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    All flows
                  </Link>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Designing
                  </Link>
                </div>

                <div className="flex w-full items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Moving
                  </Link>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-normal text-[#7e7e7e]">
                  Account
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Preferences
                  </Link>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Theme
                  </Link>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-normal text-[#7e7e7e]">
                  Library
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Catalog of poses
                  </Link>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <Link className="w-full text-start text-sm font-normal text-[#a0a0a0] hover:text-[white]">
                    Blogs
                  </Link>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="flex items-center justify-start">
                {" "}
                <p
                  className=" w-full text-start text-sm font-normal text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className="flex-1" id="canvas">
        <div className="flex h-12 max-h-12 items-center justify-start border-b-[1px] border-[#323232] pl-4">
          <p>breadcrumbs</p>
        </div>
        canvas
      </div>
    </div>
  );
}
