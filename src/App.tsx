import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import { useEffect, useState } from "react";
import LogInPopUp from "./components/sections/LoginPopUp";
import MyFlows from "./components/sections/MyFlows";
import { useUser } from "../src/components/utilities/UserContext";
import Header from "./components/sections/Header";
import Preview from "./components/sections/Preview";
import SignIn from "./components/pages/SignIn";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const { dispatch } = useUser();
  const [location, setLocation] = useState<string>("");

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
      path: "/dashboard",
      element: (
        <>
          <Dashboard></Dashboard>
        </>
      ),
    },
    {
      path: "/builder",
      element: (
        <>
          {header}
          <Builder></Builder>
        </>
      ),
    },
    {
      path: "/preview",
      element: (
        <>
          {header}
          <Preview></Preview>
        </>
      ),
    },
    {
      path: "/my-flows",
      element: (
        <>
          {header}
          <MyFlows></MyFlows>
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
