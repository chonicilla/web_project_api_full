import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./fonts/fonts.css";
import App from "./components/App.jsx";

createRoot(document.getElementById("root")).render(
  createElement(
    StrictMode,
    null,
    createElement(BrowserRouter, null, createElement(App)),
  ),
);
