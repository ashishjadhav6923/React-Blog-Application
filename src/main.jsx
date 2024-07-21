import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Layout from "./layout.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import { AboutUs, Home, LogIn, Blog } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:blogId" element={<Blog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
