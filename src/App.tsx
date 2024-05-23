import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import ErrorPage from "./components/pages/ErrorPage";
import { useEffect, useState } from "react";
import LogInPopUp from "./components/sections/LoginPopUp";
// import { useUser } from "../src/components/utilities/UserContext";
import Header from "./components/sections/Header";
import SignIn from "./components/pages/SignIn";
import Dashboard from "./components/pages/Dashboard";
import ScrollToTop from "./components/utilities/scrollToTop";

function App() {
  // const { dispatch } = useUser();
  const [location, setLocation] = useState<string>("");

  console.log(import.meta.env.VITE_REACT_APP_API_URL);

  useEffect(() => {
    console.log(location);
  }, [location]);

  // function handleKeyPress(event: KeyboardEvent) {
  //   if (event.key === "Escape") {
  //     dispatch({
  //       type: "CLOSE_LOGIN_MODAL",
  //     });
  //   }
  // }

  // document.addEventListener("keydown", handleKeyPress);

  const header = <Header location={location} setLocation={setLocation} />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          {header}
          <Home location={location} setLocation={setLocation} url="home"></Home>
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
          <ScrollToTop />
          <SignIn
            location={location}
            setLocation={setLocation}
            url="sign-in"
          ></SignIn>
        </>
      ),
    },
    {
      path: "/dashboard/flows",
      element: (
        <>
          <ScrollToTop />
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
          <ScrollToTop />
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
          <ScrollToTop />
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
          <ScrollToTop />
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
          <ScrollToTop />
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
          <ScrollToTop />
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
      <div
        className={`main flex h-full w-full flex-col ${location === "home" || location === "sign-in" ? "overflow-auto" : "overflow-hidden"}`}
      >
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
