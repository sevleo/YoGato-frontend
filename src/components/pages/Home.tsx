import Header from "../sections/Header";
import { Dispatch, SetStateAction } from "react";
import CatLogo from "../../assets/cat_logo.jpeg";
import { useUser } from "../utilities/UserContext";

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
  // const user = useUser();
  const { authState, dispatch } = useUser();

  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      {authState.dataLoading ? (
        <div></div>
      ) : (
        <div className={`${authState.showLoginPopup ? "blur-sm" : ""}`}>
          <div className=" pt-[60px] text-white">
            Welcome to YoGato {authState.user}
          </div>
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
        </div>
      )}
    </>
  );
}

export default Home;
