import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          className={`flex h-[60px] w-full max-w-screen-2xl flex-row items-center justify-start gap-10 p-2 pl-5 text-black ${isScrolled ? "blur-sm" : ""} shadow-lg`}
        >
          <HeaderDetails></HeaderDetails>
        </div>
        <div
          className={`fixed z-10 flex h-[60px] w-full max-w-screen-2xl flex-row items-center justify-start gap-10 bg-black p-2 pl-5 shadow-lg`}
          style={{
            background: "rgba(34, 32, 30, 0.9)",
            top: isScrolled ? "0px" : "-60px",
            transition: "top 0.3s ease-in-out",
          }}
        >
          <HeaderDetails></HeaderDetails>
        </div>
      </header>
    </>
  );
}

function HeaderDetails() {
  return (
    <>
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
    </>
  );
}
