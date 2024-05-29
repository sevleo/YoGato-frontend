import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "../utilities/UserContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { logout } from "../utilities/api";

interface HeaderProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

export default function Header({ setLocation }: HeaderProps) {
  const { authState, dispatch } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Theme for menu
  const menuTheme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#1c1c1c",
            borderRadius: "4px",
            border: "1x solid #2e2e2e",
            color: "white",
            boxShadow: "none",
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            width: "150px",
            // background: "red",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#343434",
            },
            "&:focus": {
              backgroundColor: "#1c1c1c",
            },
            fontSize: "14px",
            fontFamily: "Nunito Sans",
            justifyContent: "end",
            // backgroundColor: "blue",
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

  function handleHomeLink() {
    setLocation("home");
  }

  function handleDashboardLink() {
    setLocation("flows");
  }

  function handleLoginButtonClick() {
    dispatch({
      type: "OPEN_LOGIN_MODAL",
    });
  }

  // Handle user logout event
  function handleLogout() {
    logout(dispatch, setAnchorEl);
  }

  return (
    <>
      <header
        className={` relative z-50 flex h-[60px] w-full items-center justify-center border-b-[1px] border-[#323232] text-white `}
      >
        <div className="flex w-full max-w-screen-2xl items-center justify-center">
          <div
            className={`  relative flex h-[60px] w-3/4 flex-row items-center justify-center gap-10 text-black ${authState.showLoginPopup ? "blur-sm" : ""}`}
          >
            <div
              className={`flex h-full  w-full max-w-screen-2xl items-center justify-between sm:justify-start`}
            >
              <>
                <Link
                  className=" flex h-full w-[100px] items-center justify-center text-[25px] font-bold text-[#6ccc93] hover:text-[#6ccc93]"
                  to="/"
                  onClick={handleHomeLink}
                >
                  YoGato
                </Link>
                {authState.dataLoading ? (
                  <div></div>
                ) : !authState.isLoggedIn ? (
                  <>
                    {/* <Link
                      className="ml-auto flex h-full w-[100px] items-center justify-center  text-white hover:bg-[#2e2e2e] hover:text-white"
                      to="/builder"
                      // onClick={handleFlowBuilderLink}
                    >
                      Demo
                    </Link> */}
                    <div
                      onClick={handleLoginButtonClick}
                      className="ml-auto hidden h-full w-[100px] items-center justify-center font-medium text-white hover:cursor-pointer hover:bg-[#2e2e2e] hover:text-white sm:flex"
                    >
                      Sign In
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="ml-auto hidden h-full w-[100px] items-center justify-center text-white  hover:bg-[#2e2e2e] hover:text-white sm:flex"
                      to="/dashboard/flows"
                      onClick={handleDashboardLink}
                    >
                      Dashboard
                    </Link>
                    <div className="flex h-full w-[100px] items-center justify-center font-medium text-white ">
                      <div
                        className="flex h-full w-[100px] items-center justify-center font-medium text-white  hover:cursor-pointer hover:bg-[#2e2e2e]"
                        onClick={handleMenu}
                      >
                        {authState.displayName}
                      </div>{" "}
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
                          {/* <MenuItem onClick={handleClose}>Theme</MenuItem> */}
                          {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
                          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                      </ThemeProvider>
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
