import React from "react";
import ReactDOM from "react-dom/client";

import "./css/custom.css?r=3";
import "bootstrap/dist/js/bootstrap.min.js";

// Routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>
);
