import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import ErrorPage from "./components/pages/ErrorPage";
import { useEffect, useState } from "react";
import LogInPopUp from "./components/sections/LoginPopUp";
import { useUser } from "../src/components/utilities/UserContext";
import Header from "./components/sections/Header";
import SignIn from "./components/pages/SignIn";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const { dispatch } = useUser();
  const [location, setLocation] = useState<string>("flows");

  useEffect(() => {
    console.log(location);
  }, [location]);

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      dispatch({
        type: "CLOSE_LOGIN_MODAL",
      });
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  const header = <Header location={location} setLocation={setLocation} />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {header}
          <Home></Home>
          <LogInPopUp></LogInPopUp>
        </>
      ),
      errorElement: (
        <>
          {header}
          <ErrorPage></ErrorPage>
        </>
      ),
    },
    {
      path: "/sign-in",
      element: (
        <>
          <SignIn></SignIn>
        </>
      ),
    },
    {
      path: "/dashboard/flows",
      element: (
        <>
          <Dashboard
            location={location ? location : "flows"}
            setLocation={setLocation}
            url="flows"
          ></Dashboard>
        </>
      ),
    },
    {
      path: "/dashboard/designing",
      element: (
        <>
          <Dashboard
            location={location}
            setLocation={setLocation}
            url="designing"
          ></Dashboard>
        </>
      ),
    },
    {
      path: "/dashboard/moving",
      element: (
        <>
          <Dashboard
            location={location}
            setLocation={setLocation}
            url="moving"
          ></Dashboard>
        </>
      ),
    },
    {
      path: "/dashboard/preferences",
      element: (
        <>
          <Dashboard
            location={location}
            setLocation={setLocation}
            url="preferences"
          ></Dashboard>
        </>
      ),
    },
    {
      path: "/dashboard/theme",
      element: (
        <>
          <Dashboard
            location={location}
            setLocation={setLocation}
            url="theme"
          ></Dashboard>
        </>
      ),
    },
    {
      path: "/dashboard/catalog",
      element: (
        <>
          <Dashboard
            location={location}
            setLocation={setLocation}
            url="catalog"
          ></Dashboard>
        </>
      ),
    },
  ]);

  return (
    <>
      <div className="main flex h-full w-full flex-col">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
