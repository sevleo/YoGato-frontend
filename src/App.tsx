import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import Experiment from "./components/pages/Experiment";
import SignIn from "./components/pages/SignIn";
import { useState } from "react";
import { UserDataProvider } from "./components/utilities/UserContext";

function App() {
  const [, setIsHamburgerMenu] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");

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
      path: "/experiment",
      element: (
        <Experiment
          isHamburgerMenu={true}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location === "" ? "experiment" : location}
          setLocation={setLocation}
        ></Experiment>
      ),
    },
    {
      path: "/sign-in",
      element: (
        <SignIn
          isHamburgerMenu={true}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location === "" ? "sign-in" : location}
          setLocation={setLocation}
        ></SignIn>
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
