import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./context/userDataContext";

const Layout = () => {
  const { setloginSuccess, setUsername } = useUserContext();
  const tryLogin = async () => {
    const usernameLocal = localStorage.getItem("username");
    const passwordLocal = localStorage.getItem("password");
    console.log("local storage : " + usernameLocal + " " + passwordLocal);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_PATH}/api/user/login`, {
        username: usernameLocal,
        password: passwordLocal,
      });
      console.log(response.data);
      if (response.status === 200) {
        setloginSuccess(true);
        setUsername(usernameLocal)
      }
    } catch (error) {
      if (error.response) {
        console.error("There was an error!", error.response.data);
      } else {
        console.error("There was an error!", error.message);
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      tryLogin();
    } else {
      console.log("NO local data");
    }
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
