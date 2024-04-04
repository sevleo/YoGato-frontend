import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import { useEffect, useState } from "react";
import LogInPopUp from "./components/sections/LoginPopUp";
import MyFlows from "./components/pages/MyFlows";
import { useUser } from "../src/components/utilities/UserContext";

function App() {
  const { authState, dispatch } = useUser();
  const [, setIsHamburgerMenu] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    console.log(location);
  }, [location]);

  function handleKeyPress(event) {
    if (event.key === "Escape") {
      dispatch({
        type: "CLOSE_LOGIN_MODAL",
      });
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          isHamburgerMenu={true}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location === "" ? "Home" : location}
          setLocation={setLocation}
        ></Home>
      ),
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/builder",
      element: (
        <Builder
          isHamburgerMenu={false}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location === "" ? "flow-builder" : location}
          setLocation={setLocation}
        ></Builder>
      ),
    },
    {
      path: "/my-flows",
      element: (
        <MyFlows
          isHamburgerMenu={false}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location === "" ? "flow-builder" : location}
          setLocation={setLocation}
        ></MyFlows>
      ),
    },
  ]);

  return (
    <>
      <div className="main h-full w-full">
        <RouterProvider router={router} />
      </div>
      <LogInPopUp></LogInPopUp>
    </>
  );
}

export default App;
