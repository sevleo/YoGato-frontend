import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";
import "./Header.css";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "../utilities/UserContext";

interface HeaderProps {
  isHamburgerMenu: boolean;
  setIsHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

export default function Header({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}: HeaderProps) {
  const { authState, dispatch } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Controls when to show hamburger menu slide animation
  const [showSlideAnimation, setShowSlideAnimation] = useState(true);

  function enableHamburger() {
    setIsHamburgerMenu(true);
  }

  function disableHamburger() {
    setIsHamburgerMenu(false);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 5) {
        console.log("scrolled");
        setIsScrolled(true);
      } else {
        console.log("not scrolled");

        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Enables hamburger slide animation
  useEffect(() => {
    if (!isOpen) {
      setShowSlideAnimation(true);
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={` relative z-50 flex h-[60px] w-full  items-center justify-center border-neutral-300 bg-black text-white`}
      >
        <div
          className={`relative flex h-[60px] w-full flex-row items-center justify-center gap-10 pl-5 pr-5 text-black ${isScrolled ? "blur-sm" : ""} shadow-lg`}
        >
          <HeaderDetails
            enableHamburger={enableHamburger}
            disableHamburger={disableHamburger}
            isHamburgerMenu={isHamburgerMenu}
            isOpen={isOpen}
            setOpen={setOpen}
            showCollapsibleMenu={isScrolled ? false : true}
            showSlideAnimation={showSlideAnimation}
            setShowSlideAnimation={setShowSlideAnimation}
            location={location}
            setLocation={setLocation}
            authState={authState}
          ></HeaderDetails>
        </div>
        <div
          className={`fixed left-[-1px] z-10  flex h-[60px] w-full flex-row items-center justify-center gap-10 bg-black pl-5 pr-5 shadow-lg`}
          style={{
            background: "rgba(34, 32, 30, 0.9)",
            top: isScrolled ? "0px" : "-60px",
            transition: "top 0.3s ease-in-out",
          }}
        >
          <HeaderDetails
            enableHamburger={enableHamburger}
            disableHamburger={disableHamburger}
            isHamburgerMenu={isHamburgerMenu}
            isOpen={isOpen}
            setOpen={setOpen}
            showCollapsibleMenu={isScrolled ? true : false}
            showSlideAnimation={showSlideAnimation}
            setShowSlideAnimation={setShowSlideAnimation}
            location={location}
            setLocation={setLocation}
            authState={authState}
          ></HeaderDetails>
        </div>
      </header>
    </>
  );
}

interface HeaderDetailsProps {
  enableHamburger: () => void;
  disableHamburger: () => void;
  isHamburgerMenu: boolean;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showCollapsibleMenu: boolean;
  showSlideAnimation: boolean;
  setShowSlideAnimation: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function HeaderDetails({
  enableHamburger,
  disableHamburger,
  isHamburgerMenu,
  isOpen,
  setOpen,
  showCollapsibleMenu,
  showSlideAnimation,
  setShowSlideAnimation,
  setLocation,
  authState,
}: HeaderDetailsProps) {
  // Disables burger slide animation to avoid showing animation when switching between headers views
  function handleAnimationEnd() {
    setShowSlideAnimation(false);
  }

  function handleHomeLink() {
    enableHamburger();
    setLocation("home");
  }

  function handleFlowBuilderLink() {
    disableHamburger();
    setLocation("flow-builder");
  }

  function handleExperimentLink() {
    enableHamburger();
    setLocation("experiment");
  }

  function handleSignInLink() {
    enableHamburger();
    setLocation("sign-in");
  }

  return (
    <>
      <div className="flex w-full max-w-screen-2xl items-center justify-start gap-10">
        <>
          <Link
            className="text-white hover:text-white hover:underline"
            to="/"
            onClick={handleHomeLink}
          >
            Home
          </Link>

          <Link
            className=" text-white hover:text-white hover:underline"
            to="/builder"
            onClick={handleFlowBuilderLink}
          >
            Flow Builder
          </Link>

          <Link
            className="text-white hover:text-white hover:underline"
            to="/experiment"
            onClick={handleExperimentLink}
          >
            Experiment...
          </Link>
          <Link
            className="ml-auto text-white hover:text-white hover:underline"
            to="/sign-in"
            onClick={handleSignInLink}
          >
            Sign In {authState.user}
          </Link>
        </>

        {/* {isHamburgerMenu ? (
          <>
            <Link
              className="text-white hover:text-white hover:underline"
              to="/"
              onClick={handleHomeLink}
            >
              Home
            </Link>

            <Link
              className=" text-white hover:text-white hover:underline"
              to="/builder"
              onClick={handleFlowBuilderLink}
            >
              Flow Builder
            </Link>

            <Link
              className="text-white hover:text-white hover:underline"
              to="/experiment"
              onClick={handleExperimentLink}
            >
              Experiment...
            </Link>
            <Link
              className="ml-auto text-white hover:text-white hover:underline"
              to="/sign-in"
              onClick={handleSignInLink}
            >
              Sign In {authState.user}
            </Link>
          </>
        ) : (
          <>
            <div className="flex h-full w-[100px] items-center justify-start">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                color="white"
              ></Hamburger>
              {isOpen && showCollapsibleMenu ? (
                <>
                  <div
                    className={`absolute top-[60px] flex flex-col items-start`}
                    style={{
                      animation: `${showSlideAnimation ? "slideIn" : null} 0.3s forwards`,
                    }}
                    onAnimationEnd={handleAnimationEnd}
                  >
                    <Link
                      onClick={handleHomeLink}
                      className="text-white hover:text-white hover:underline"
                      to="/"
                    >
                      Home
                    </Link>

                    <Link
                      onClick={handleFlowBuilderLink}
                      className=" text-white hover:text-white hover:underline"
                      to="/builder"
                    >
                      Flow Builder
                    </Link>

                    <Link
                      onClick={handleExperimentLink}
                      className="text-white hover:text-white hover:underline"
                      to="/experiment"
                    >
                      Experiment...
                    </Link>
                    <Link
                      className="ml-auto text-white hover:text-white hover:underline"
                      to="/sign-in"
                      onClick={handleSignInLink}
                    >
                      Sign In {authState.user}
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </>
        )} */}

        {/* <div className="flex h-full w-[100px] items-center justify-start"></div> */}
      </div>
    </>
  );
}
