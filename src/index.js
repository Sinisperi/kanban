import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { RootContextProvider } from "./context";
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <RootContextProvider>
    <App />
  </RootContextProvider>
);
