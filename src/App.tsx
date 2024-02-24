import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Builder from "./components/pages/Builder";
import ErrorPage from "./components/pages/ErrorPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  ]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </>
  );
}

export default App;
