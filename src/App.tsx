import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import Experiment from "./components/pages/Experiment";
import { useState } from "react";

function App() {
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(true);
  const [location, setLocation] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          isHamburgerMenu={isHamburgerMenu}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location}
          setLocation={setLocation}
        ></Home>
      ),
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/builder",
      element: (
        <Builder
          isHamburgerMenu={isHamburgerMenu}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location}
          setLocation={setLocation}
        ></Builder>
      ),
    },
    {
      path: "/experiment",
      element: (
        <Experiment
          isHamburgerMenu={isHamburgerMenu}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={location}
          setLocation={setLocation}
        ></Experiment>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
