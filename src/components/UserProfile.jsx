import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userDataContext";
import axios from "axios";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const navigate = useNavigate();
  const { setloginSuccess, userData, loginSuccess } = useUserContext();
  if (!loginSuccess)
    return (
      <p className="max-w-screen-xl mx-auto min-h-96">Please log in first</p>
    );
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
    <section className="flex flex-col py-4 items-center justify-center max-w-screen-xl mx-auto min-h-96">
      <div className="shadow-lg drop-shadow-xl relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
        <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src={userData.img}
                  alt="Author Avatar"
                />
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Link
                      className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                      href="#"
                    >
                      {userData.name}
                    </Link>
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                    <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-1">
                        <FaLocationDot />
                      </span>
                      India
                    </p>
                    <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-1">
                        <HiMail />
                      </span>
                      {userData.email}
                    </p>
                    <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-1">
                        <FaStar />
                      </span>
                      {userData.averageRating}/10
                    </p>
                    <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-1">
                        <FaUserCircle />
                      </span>
                      Username: {userData.username}
                    </p>
                  </div>
                </div>
                <div className="flex md:flex-col md:gap-4 my-auto">
                  <Link
                    to={`/Blogs/Author/${userData.username}`}
                    className="font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-600 hover:text-white shadow-lg"
                  >
                    Read Blogs
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center">
                  <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                    Ratings: {userData.ratings.length}
                  </p>
                  <Link
                    to={`/Blogs/Author/${userData.username}`}
                    className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                  >
                    Blogs: {userData.blogs.length}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full h-px border-neutral-200" />
        </div>
      </div>
      <button
        onClick={handleLogOut}
        className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 bg-blue-600 text-white hover:text-lg shadow-lg"
      >
        Log Out
      </button>
    </section>
  );
};

export default UserProfile;
