import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { RootContextProvider } from "./context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 style={{ color: "red" }}>Some shit happend</h1>,
  },
]);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <RootContextProvider>
    <RouterProvider router={router} />
  </RootContextProvider>
);
