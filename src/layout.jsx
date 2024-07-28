import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import LogInContextProvider from "./context/logInContext";
const Layout = () => {
  return (
    <>
      <LogInContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </LogInContextProvider>
    </>
  );
};

export default Layout;
