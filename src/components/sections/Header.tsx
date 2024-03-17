import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";
import "./Header.css";

export default function Header({ isHamburgerMenu, setIsHamburgerMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Controls when to show hamburger menu slide animation
  const [showSlideAnimation, setShowSlideAnimation] = useState(true);

  function enableHamburger() {
    console.log("enable");
    setIsHamburgerMenu(true);
  }

  function disableHamburger() {
    console.log("disable");
    setIsHamburgerMenu(false);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
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
        className={`} relative z-50 flex h-[60px] w-full  items-center justify-center border-neutral-300 bg-black text-white`}
      >
        <div
          className={`relative flex h-[60px] w-full max-w-screen-2xl flex-row items-center justify-start gap-10 p-2 pl-5 text-black ${isScrolled ? "blur-sm" : ""} shadow-lg`}
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
          ></HeaderDetails>
        </div>
        <div
          className={`fixed z-10 flex h-[60px] w-full max-w-screen-2xl flex-row items-center justify-start gap-10 bg-black p-2 pl-5 shadow-lg`}
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
          ></HeaderDetails>
        </div>
      </header>
    </>
  );
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
}) {
  // Disables burger slide animation to avoid showing animation when switching between headers views
  function handleAnimationEnd() {
    setShowSlideAnimation(false);
  }

  return isHamburgerMenu ? (
    <>
      <Link
        className="text-white hover:text-white hover:underline"
        to="/"
        onClick={enableHamburger}
      >
        Home
      </Link>

      <Link
        className=" text-white hover:text-white hover:underline"
        to="/builder"
        onClick={disableHamburger}
      >
        Flow Builder
      </Link>

      <Link
        className="text-white hover:text-white hover:underline"
        to="/experiment"
        onClick={enableHamburger}
      >
        Experiment...
      </Link>
    </>
  ) : (
    <>
      <div className="">
        <Hamburger toggled={isOpen} toggle={setOpen} color="white"></Hamburger>
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
                onClick={enableHamburger}
                className="text-white hover:text-white hover:underline"
                to="/"
              >
                Home
              </Link>

              <Link
                onClick={disableHamburger}
                className=" text-white hover:text-white hover:underline"
                to="/builder"
              >
                Flow Builder
              </Link>

              <Link
                onClick={enableHamburger}
                className="text-white hover:text-white hover:underline"
                to="/experiment"
              >
                Experiment...
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
