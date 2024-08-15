import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { AboutUs, Home, LogIn, Blog, BlogList} from "./components";
import Page404 from "./components/404.jsx";
import SignUp from "./components/signUp.jsx";
import UserProfile from "./components/UserProfile.jsx";
import BlogWritingForm from "./components/writeBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<AboutUs />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signIn" element={<SignUp />} />
      <Route path="/Blogs" element={<BlogList />} />
      <Route path="/Profile" element={<UserProfile />} />
      <Route path="/Write-Blog" element={<BlogWritingForm />} />
      <Route path="/Blogs/:blogId" element={<Blog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
