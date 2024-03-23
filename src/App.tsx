import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import Experiment from "./components/pages/Experiment";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState<string>("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
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
          location={location === "" ? "flow-builder" : location}
          setLocation={setLocation}
        ></Builder>
      ),
    },
    {
      path: "/experiment",
      element: (
        <Experiment
          location={location === "" ? "experiment" : location}
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
