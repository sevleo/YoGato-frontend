import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";
import "./Header.css";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "../utilities/UserContext";
import axios from "axios";

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
  showLoginPopup,
  setShowLoginPopup,
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
        className={` relative z-50 flex h-[60px] w-full  items-center justify-center border-neutral-300 bg-black text-white ${showLoginPopup ? "blur-sm" : ""}`}
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
            dispatch={dispatch}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
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
            dispatch={dispatch}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
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
  dispatch,
  showLoginPopup,
  setShowLoginPopup,
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

  function handleLoginButtonClick() {
    setShowLoginPopup(true);
  }

  async function handleLogout(event) {
    try {
      const response = await axios.get("http://localhost:3001/log-out", {
        withCredentials: true,
      });
      console.log(response);
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <>
      <div
        className={`flex w-full max-w-screen-2xl items-center justify-start gap-10`}
      >
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

          {!authState.isLoggedIn ? (
            <div
              onClick={handleLoginButtonClick}
              className="ml-auto font-medium text-white hover:cursor-pointer hover:text-white hover:underline"
            >
              Sign In
            </div>
          ) : (
            <div className="ml-auto font-medium text-white ">
              <span className="font-medium text-white">{authState.user},</span>{" "}
              <span
                className="font-medium text-white hover:cursor-pointer hover:text-white hover:underline"
                onClick={handleLogout}
              >
                logout
              </span>
            </div>
          )}
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
