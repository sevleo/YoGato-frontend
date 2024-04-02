import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import { useState } from "react";
import { UserDataProvider } from "./components/utilities/UserContext";
import LogInPopUp from "./components/sections/LoginPopUp";

function App() {
  const [, setIsHamburgerMenu] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home
            isHamburgerMenu={true}
            setIsHamburgerMenu={setIsHamburgerMenu}
            location={location === "" ? "Home" : location}
            setLocation={setLocation}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></Home>
          <LogInPopUp showLoginPopup={showLoginPopup}></LogInPopUp>
        </>
      ),
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/builder",
      element: (
        <>
          <Builder
            isHamburgerMenu={false}
            setIsHamburgerMenu={setIsHamburgerMenu}
            location={location === "" ? "flow-builder" : location}
            setLocation={setLocation}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></Builder>
          <LogInPopUp showLoginPopup={showLoginPopup}></LogInPopUp>
        </>
      ),
    },
  ]);

  return (
    <>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </>
  );
}

export default App;
