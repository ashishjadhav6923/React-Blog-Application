import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userDataContext";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const { setloginSuccess, userData } = useUserContext();
  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_PATH}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("logging out : ", response.data);
      if (response.status === 200) {
        setloginSuccess(false);
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error!", error.message);
    }
  };

  return (
    <section className="flex flex-col py-4 items-center justify-center">
      <section className="w-fit mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg h-fit flex items-center justify-center flex-col gap-2">
        <div className="w-fit mx-auto">
          <img src={userData.img} className="rounded-full w-28" alt="profile" />
        </div>
        <div className="mt-8 text-white">
          <h2 className="font-bold text-2xl tracking-wide">
            Name : {userData.name}
          </h2>
          <p className="text-lg">Username : {userData.username}</p>
          <p className="text-sm">Profession : {userData.profession}</p>
        </div>
      </section>
      <div className="flex gap-6 py-2">
        <button
          onClick={handleLogOut}
          className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 hover:text-white"
        >
          Log Out
        </button>
        <a href="">
          <button className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 hover:text-white">
            My blogs
          </button>
        </a>
      </div>
    </section>
  );
};

export default UserProfile;
