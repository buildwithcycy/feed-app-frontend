import React from "react";
import ReactDOM from "react-dom/client";
import AppContextProvider from "./context/applicationContext";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <CookiesProvider>
    <AppContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppContextProvider>
  </CookiesProvider>
);