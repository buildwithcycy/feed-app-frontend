import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import "./index.css";
import App from "./App";

// 1. The Type Assertion ('as HTMLElement')
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <AppRoutes />
  </Router>
);
