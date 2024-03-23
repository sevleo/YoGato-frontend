import Header from "../sections/Header";
import { Dispatch, SetStateAction } from "react";
import CatLogo from "../../assets/cat_logo.jpeg";

interface HomeProps {
  isHamburgerMenu: boolean;
  setIsHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Home({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}: HomeProps) {
  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      <div className=" pt-[60px] text-white">Welcome to YoGato</div>
      <br />

      <div
        className="flex h-[100px] items-center justify-center"
        style={{ borderRadius: "50%" }}
      >
        <img
          className="h-[100px] "
          src={CatLogo}
          alt=""
          style={{ borderRadius: "50%" }}
        />
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Home;
