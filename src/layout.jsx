import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const [loginSuccess, setloginSuccess] = useState(false);
  return (
    <>
      <Header loginSuccess={loginSuccess} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
