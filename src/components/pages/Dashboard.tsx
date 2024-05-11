import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utilities/api";
import { useUser } from "../utilities/UserContext";
import {
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  ReactNode,
} from "react";
import MyFlows from "../sections/MyFlows";
import { FlowType } from "../sections/MyFlows";
import { showAllFlowsAPI } from "../utilities/api";
import Builder from "../sections/Builder";
import Preview from "../sections/Preview";
import { Dispatch } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { useRef } from "react";
import Catalog from "../sections/Catalog";

interface DashboardProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  url: string;
}

export default function Dashboard({
  location,
  setLocation,
  url,
}: DashboardProps) {
  const navigate = useNavigate();
  const { authState, dispatch } = useUser();
  const [flows, setFlows] = useState<FlowType[]>([]);
  const [isHamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth >= 650) {
        setHamburgerOpen(false);
      }
      if (window.innerWidth < 640) {
        setIsMobile(true);
      }
      if (window.innerWidth >= 640) {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  useEffect(() => {
    setLocation(url);
  });

  // Display all flows
  const showAllFlows = useCallback(() => {
    // API call to fetch flows
    showAllFlowsAPI(authState, setFlows);
  }, [authState]);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn) {
      showAllFlows();
    }
  }, [authState.dataLoading, authState.isLoggedIn, showAllFlows]);

  function handleHomeLink() {
    navigate("/");
    setHamburgerOpen(false);
  }

  function handleLogout() {
    logout(dispatch);
    setHamburgerOpen(false);
  }

  function handleFlowsClick() {
    setLocation("flows");
    navigate("/dashboard/flows");
    setHamburgerOpen(false);
  }

  function handleDesigningClick() {
    setLocation("designing");
    navigate("/dashboard/designing");
    setHamburgerOpen(false);
  }

  function handleMovingClick() {
    setLocation("moving");
    navigate("/dashboard/moving");
    setHamburgerOpen(false);
  }

  function handlePreferencesClick() {
    setLocation("preferences");
    navigate("/dashboard/preferences");
    setHamburgerOpen(false);
  }

  function handleThemeClick() {
    setLocation("theme");
    navigate("/dashboard/theme");
    setHamburgerOpen(false);
  }

  function handleCatalogClick() {
    setLocation("catalog");
    navigate("/dashboard/catalog");
    setHamburgerOpen(false);
  }

  useEffect(() => {
    if (!authState.dataLoading && !authState.isLoggedIn) {
      navigate("/sign-in");
    }
  }, [authState, navigate]);

  return (
    <div className="flex h-full w-full">
      <div
        className=" hide-scrollbar h-full min-w-[170px] max-w-[170px] overflow-auto border-r-[1px] border-[#323232] max-[650px]:hidden"
        id="sidebar"
      >
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
          <ul className="">
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className="text-start text-sm font-medium text-[#7e7e7e]">
                  Practice
                </p>
              </div>
              <ul className="flex w-full flex-col space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleFlowsClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    All flows
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleDesigningClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Designing
                  </p>
                </div>

                <div className="flex w-full items-center justify-start">
                  {" "}
                  <p
                    onClick={handleMovingClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Moving
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-medium text-[#7e7e7e]">
                  Account
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handlePreferencesClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Preferences
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleThemeClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Theme
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-medium text-[#7e7e7e]">
                  Library
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleCatalogClick}
                    className=" w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Catalog of poses
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p className=" w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]">
                    Blogs
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="flex items-center justify-start">
                {" "}
                <p
                  className="flex w-full items-center justify-start gap-[4px] text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    logout
                  </span>
                  Log out
                </p>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className="relative  flex-1" id="canvas">
        <div
          // style={{ boxShadow: "0px 1px 3px 1px rgb(0 0 0 / 75%)" }}
          className="relative flex h-12 max-h-12 items-center justify-between  border-b-[1px] border-[#323232] max-[650px]:w-screen"
        >
          <div className="flex h-full w-[170px] items-center justify-start  pl-6 ">
            <p className="text-lg min-[650px]:text-base">
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </p>
          </div>
          <div className=" hidden w-[170px] items-center justify-end pr-6  max-[650px]:flex ">
            <Hamburger
              rounded
              toggled={isHamburgerOpen}
              toggle={setHamburgerOpen}
            ></Hamburger>
          </div>

          <nav
            className={`absolute left-0 top-[48px] z-[51] h-auto w-[170px] border-r-[1px] border-[#323232] bg-[#1c1c1c] max-[650px]:h-[100vh] max-[650px]:w-full ${isHamburgerOpen ? "pointer-events-auto opacity-100" : " pointer-events-none opacity-0"}  transition-all duration-200`}
          >
            <ul className="hamburger">
              <div className="border-b-[1px] border-[#323232] px-6 py-5">
                <div className="mb-5">
                  {" "}
                  <p className="text-center text-lg font-medium text-[#7e7e7e]">
                    Practice
                  </p>
                </div>
                <ul className="flex w-full flex-col space-y-5">
                  <div className="flex items-center justify-center">
                    {" "}
                    <p
                      onClick={handleFlowsClick}
                      className="w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      All flows
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    {" "}
                    <p
                      onClick={handleDesigningClick}
                      className="w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      Designing
                    </p>
                  </div>

                  <div className="flex w-full items-center justify-center">
                    {" "}
                    <p
                      onClick={handleMovingClick}
                      className="w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      Moving
                    </p>
                  </div>
                </ul>
              </div>
              <div className="border-b-[1px] border-[#323232] px-6 py-5">
                <div className="mb-5">
                  {" "}
                  <p className=" text-center text-lg font-medium text-[#7e7e7e]">
                    Account
                  </p>
                </div>
                <ul className="space-y-5">
                  <div className="flex items-center justify-center">
                    {" "}
                    <p
                      onClick={handlePreferencesClick}
                      className="w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      Preferences
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    {" "}
                    <p
                      onClick={handleThemeClick}
                      className="w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      Theme
                    </p>
                  </div>
                </ul>
              </div>
              <div className="border-b-[1px] border-[#323232] px-6 py-5">
                <div className="mb-5">
                  {" "}
                  <p className=" text-center text-lg font-medium text-[#7e7e7e]">
                    Library
                  </p>
                </div>
                <ul className="space-y-5">
                  <div className="flex items-center justify-center">
                    {" "}
                    <p
                      onClick={handleCatalogClick}
                      className=" w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    >
                      Catalog of poses
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    {" "}
                    <p className=" w-full text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]">
                      Blogs
                    </p>
                  </div>
                </ul>
              </div>
              <div className="border-b-[1px] border-[#323232] px-6 py-5">
                <div className="flex items-center justify-center">
                  {" "}
                  <p
                    className="flex w-full items-center justify-center gap-[4px] text-center text-lg font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                    onClick={handleLogout}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      logout
                    </span>
                    Log out
                  </p>
                </div>
              </div>
            </ul>
          </nav>
        </div>
        <Wrapper wrapperRef={wrapperRef} location={location}>
          {location === "flows" ? (
            <>
              <div className="flex w-full grid-rows-[auto_1fr] flex-col gap-6 min-[850px]:grid">
                <MyFlows
                  showAllFlows={showAllFlows}
                  flows={flows}
                  handleDesigningClick={handleDesigningClick}
                  handleMovingClick={handleMovingClick}
                />
              </div>
            </>
          ) : location === "designing" ? (
            <>
              <div className="flex w-full grid-cols-[2fr_1fr] grid-rows-[auto_1fr] flex-col gap-6 min-[850px]:grid">
                <Builder
                  showAllFlows={showAllFlows}
                  handleMovingClick={handleMovingClick}
                  isMobile={isMobile}
                ></Builder>
              </div>
            </>
          ) : location === "moving" ? (
            <>
              <div className="flex h-fit w-full grid-cols-[2fr_1fr] grid-rows-[auto_1fr] flex-col gap-6 min-[1180px]:grid">
                <Preview
                  handleDesigningClick={handleDesigningClick}
                  handleFlowsClick={handleFlowsClick}
                ></Preview>
              </div>
            </>
          ) : location === "preferences" ? (
            <>
              <p>preferences</p>
            </>
          ) : location === "theme" ? (
            <>
              <p>theme</p>
            </>
          ) : location === "catalog" ? (
            <>
              <Catalog />
            </>
          ) : (
            <>
              <p>no such page</p>
            </>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

interface WrapperProps {
  children: ReactNode;
  wrapperRef: React.RefObject<HTMLDivElement>;
  location: string;
}

function Wrapper({ children, wrapperRef, location }: WrapperProps) {
  return (
    <div
      ref={wrapperRef}
      className={`wrapper mb-6 ml-auto mr-auto flex h-[calc(100%-48px)] w-full max-w-screen-2xl justify-center overflow-auto p-6  ${location === "designing" ? "max-[650px]:h-[calc(100%-248px)]" : ""}`}
    >
      {children}
    </div>
  );
}
