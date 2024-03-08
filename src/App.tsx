import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import Experiment from "./components/pages/Experiment";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/builder",
      element: <Builder></Builder>,
    },
    {
      path: "/experiment",
      element: <Experiment></Experiment>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
