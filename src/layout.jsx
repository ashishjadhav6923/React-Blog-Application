import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import { useLogin } from "./context/logInContext";
import axios from "axios";

const Layout = () => {
  let api_path = `${import.meta.env.VITE_API_PATH}/api/login`;
  const { setloginSuccess, setprofileName } = useLogin();
  const tryLogin = async () => {
    const usernameLocal = localStorage.getItem("username");
    const passwordLocal = localStorage.getItem("password");
    console.log("local storage : " + usernameLocal + " " + passwordLocal);
    try {
      const response = await axios.post(api_path, {
        username: usernameLocal,
        password: passwordLocal,
      });
      console.log(response.data);
      if (response.status === 200) {
        setprofileName(usernameLocal);
        setloginSuccess(true);
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
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
