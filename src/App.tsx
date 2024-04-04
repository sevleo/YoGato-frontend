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

  function handleKeyPress(event) {
    if (event.key === "Escape") {
      setShowLoginPopup(false);
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="main h-full w-full">
          <Home
            isHamburgerMenu={true}
            setIsHamburgerMenu={setIsHamburgerMenu}
            location={location === "" ? "Home" : location}
            setLocation={setLocation}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></Home>
          <LogInPopUp
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></LogInPopUp>
        </div>
      ),
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/builder",
      element: (
        <div className="main h-full w-full">
          <Builder
            isHamburgerMenu={false}
            setIsHamburgerMenu={setIsHamburgerMenu}
            location={location === "" ? "flow-builder" : location}
            setLocation={setLocation}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></Builder>
          <LogInPopUp
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          ></LogInPopUp>
        </div>
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
