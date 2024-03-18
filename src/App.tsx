import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import Experiment from "./components/pages/Experiment";
import { useState } from "react";

function App() {
  const [isHamburgerMenu, setIsHamburgerMenu] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          isHamburgerMenu={true}
          setIsHamburgerMenu={setIsHamburgerMenu}
          location={"home"}
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
          location={"flow-builder"}
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
          location={"experiment"}
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
