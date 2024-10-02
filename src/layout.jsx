import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./context/userDataContext";

const Layout = () => {
  const { setloginSuccess, setUserData } = useUserContext();
  const tryLoginWithJWT = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/api/user/loginWithJWT`,
        {},
        { withCredentials: true }
      );
      console.log("response after logIn with accessToken :", response.data);
      if (response.status === 200) {
        setUserData((prevState) => ({
          ...prevState,
          name: response.data.user.name,
          username: response.data.user.username,
          email: response.data.user.email,
          profession: response.data.user.profession,
          img: response.data.user.img,
          blogs: response.data.user.blogs,
        }));
        setloginSuccess(true);
      }
    } catch (error) {
      console.error("There was an error!", error.message);
    }
  };
  useEffect(() => {
    tryLoginWithJWT();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <Header />
      <div className="p-4 sm:py-6 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
