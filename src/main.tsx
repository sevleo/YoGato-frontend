import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserDataProvider } from "./components/utilities/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </React.StrictMode>
);
