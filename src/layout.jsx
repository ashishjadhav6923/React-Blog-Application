import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import LogInContextProvider from "./context/logInContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Layout = () => {
  return (
    <LogInContextProvider>
      <div className="hidden lg:block">
        {" "}
        {/* Hide on small screens */}
        <SimpleBar style={{ maxHeight: "100vh" }}>
          <Header />
          <Outlet />
          <Footer />
        </SimpleBar>
      </div>
      <div className="lg:hidden">
        {" "}
        {/* Visible on small screens */}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LogInContextProvider>
  );
};

export default Layout;
