import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divide as Hamburger } from "hamburger-react";
import "./Header.css";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "../utilities/UserContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { logout } from "../utilities/api";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Theme for menu
  const menuTheme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#1c1c1c",
            borderRadius: "4px",
            border: "0.5px solid #2e2e2e",
            color: "white",
            boxShadow: "none",
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            width: "150px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#343434",
            },
            fontSize: "14px",
            fontFamily: "Nunito Sans",
            // textAlign: "end",
            // display: "flex",
            // justifyContent: "end",
          },
        },
      },
    },
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        setAnchorEl(null);
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
        className={` relative z-50 flex h-[60px] w-full  items-center justify-center border-neutral-300 bg-black text-white `}
      >
        <div className="flex w-full max-w-screen-2xl items-center justify-center">
          <div
            className={`relative flex h-[60px] w-3/4 flex-row items-center justify-center gap-10 text-black ${isScrolled || authState.showLoginPopup ? "blur-sm" : ""} shadow-lg`}
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
              handleMenu={handleMenu}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClose={handleClose}
              menuTheme={menuTheme}
            ></HeaderDetails>
          </div>
          <div
            className={` fixed left-[-4px] z-10 flex  h-[60px] w-full flex-row items-center justify-center gap-10 bg-black shadow-lg ${authState.showLoginPopup ? "blur-sm" : ""}`}
            style={{
              background: "rgba(34, 32, 30, 1)",
              top: isScrolled ? "0px" : "-60px",
              transition: "top 0.3s ease-in-out",
              transform: "translateX(4px)",
            }}
          >
            <div className="flex h-full w-full max-w-screen-2xl items-center justify-center">
              <div style={{ width: "calc(75% + 8px)", height: "100%" }}>
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
                  handleMenu={handleMenu}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  handleClose={handleClose}
                  menuTheme={menuTheme}
                ></HeaderDetails>
              </div>
            </div>
          </div>
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
  handleMenu,
  anchorEl,
  setAnchorEl,
  handleClose,
  menuTheme,
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

  function handleMyFlowsLink() {
    disableHamburger();
    setLocation("my-flows");
  }

  function handleLoginButtonClick() {
    dispatch({
      type: "OPEN_LOGIN_MODAL",
    });
  }

  // Handle user logout event
  function handleLogout(event) {
    logout(dispatch, setAnchorEl);
  }

  return (
    <>
      <div
        className={`flex h-full  w-full max-w-screen-2xl items-center justify-start`}
      >
        <>
          <Link
            className="flex h-full w-[100px] items-center justify-center  text-white hover:bg-[#2e2e2e] hover:text-white"
            to="/"
            onClick={handleHomeLink}
          >
            Home
          </Link>

          <Link
            className="flex h-full w-[100px] items-center justify-center  text-white hover:bg-[#2e2e2e] hover:text-white"
            to="/builder"
            onClick={handleFlowBuilderLink}
          >
            Builder
          </Link>
          {authState.isLoggedIn ? (
            <Link
              className="flex h-full w-[100px] items-center justify-center  text-white hover:bg-[#2e2e2e] hover:text-white"
              to="/my-flows"
              onClick={handleMyFlowsLink}
            >
              My Flows
            </Link>
          ) : null}

          {authState.dataLoading ? (
            <div></div>
          ) : !authState.isLoggedIn ? (
            <div
              onClick={handleLoginButtonClick}
              className="ml-auto flex h-full w-[100px] items-center justify-center font-medium text-white hover:cursor-pointer hover:bg-[#2e2e2e] hover:text-white"
            >
              Sign In
            </div>
          ) : (
            <div className="ml-auto flex h-full w-[100px] items-center justify-center font-medium text-white ">
              <div
                className="flex h-full w-[100px] items-center justify-center font-medium text-white  hover:cursor-pointer hover:bg-[#2e2e2e]"
                onClick={handleMenu}
              >
                {authState.user}
              </div>{" "}
              {/* <AccountCircle
                onClick={handleMenu}
                sx={{
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                }}
              /> */}
              <ThemeProvider theme={menuTheme}>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Theme</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </ThemeProvider>
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
