import Header from "../sections/Header";
import { Dispatch, SetStateAction } from "react";

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
        setFlowState={null}
      />
      <div className="pt-[60px] text-white">Welcome to YoGato</div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Home;
