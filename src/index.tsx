import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TaskProvider } from "./Store/Provider/Provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskComponent from "./Task";
import Main from "./Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/Renesandro",
    element: <App />,
  },
  {
    path: "/Renesandro/:id",
    element: <TaskComponent />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </React.StrictMode>
);
