import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";

export default function Header({ isHamburgerMenu, setIsHamburgerMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

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
            isScrolled={isScrolled}
            showCollapsibleMenu={isScrolled ? true : false}
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
}) {
  return isHamburgerMenu ? (
    <>
      <div onClick={enableHamburger}>
        <Link className="text-white hover:text-white hover:underline" to="/">
          Home
        </Link>
      </div>

      <div onClick={disableHamburger}>
        <Link
          className=" text-white hover:text-white hover:underline"
          to="/builder"
        >
          Flow Builder
        </Link>
      </div>

      <div onClick={enableHamburger}>
        <Link
          className="text-white hover:text-white hover:underline"
          to="/experiment"
        >
          Experiment...
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="absolute top-0">
        <div className="flex h-[60px] items-center justify-center">
          {" "}
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color="white"
          ></Hamburger>
        </div>
        {isOpen && showCollapsibleMenu ? (
          <div>
            <div>Item 1</div>
            <div>Item 1</div>
            <div>Item 1</div>
          </div>
        ) : null}
      </div>
    </>
  );
}
