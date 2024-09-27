import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./context/userDataContext";

const Layout = () => {
  const { setloginSuccess } = useUserContext();
  const tryLoginWithJWT = async () => {
    try {
    } catch (error) {}
  };
  useEffect(() => {
    tryLoginWithJWT();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <Header />
      <div className="p-4 sm:py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
