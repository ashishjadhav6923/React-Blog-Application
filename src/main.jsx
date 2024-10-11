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
import { AboutUs, Home, LogIn, Blog, BlogList } from "./components";
import Page404 from "./components/404.jsx";
import SignUp from "./components/signUp.jsx";
import UserProfile from "./components/UserProfile.jsx";
import BlogWritingForm from "./components/writeBlog.jsx";
import AuthorsList from "./components/AuthorsList.jsx";
import UserContextProvider from "./context/userDataContext.jsx";
import AuthorProfile from "./components/authorProfile.jsx";
import AuthorBlogList from "./components/AuthorBlogList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<AboutUs />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signIn" element={<SignUp />} />
      <Route path="/Blogs" element={<BlogList />} />
      <Route path="/Blogs/Author/:username" element={<AuthorBlogList />} />
      <Route path="/Profile" element={<UserProfile />} />
      <Route path="/Write-Blog" element={<BlogWritingForm />} />
      <Route path="/Authors" element={<AuthorsList />} />
      <Route path="/Blogs/:blogId" element={<Blog />} />
      <Route path="/Authors/profile/:username" element={<AuthorProfile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
