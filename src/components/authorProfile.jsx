import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import ReviewModal from "./ReviewModal";
const AuthorProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const getUserData = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_PATH}/api/user/userInfo/${username}`
      );
      setUserData(response.data.userInfo);
    } catch (error) {
      console.log(error);
      seterror("Error fetching profile");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [username]);

  const [toggleReview, settoggleReview] = useState(false);
  const toggleReviewModal = () => {
    settoggleReview(!toggleReview);
  };

  useEffect(() => {
    if (toggleReview) {
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [toggleReview]);

  if (loading)
    return <p className="max-w-screen-xl mx-auto min-h-96">Loading...</p>;
  if (error) return <p className="max-w-screen-xl mx-auto min-h-96">{error}</p>;
  if (!userData)
    return (
      <p className="max-w-screen-xl mx-auto min-h-96">No user data found</p>
    );
  return (
    <>
      {toggleReview && (
        <ReviewModal
          toggleReview={toggleReview}
          toggleReviewModal={toggleReviewModal}
          Data={userData}
          type='user'
        />
      )}
      <div className="max-w-screen-xl mx-auto min-h-96">
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
                    <button
                      onClick={toggleReviewModal}
                      className="font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-600 hover:text-white shadow-lg"
                    >
                      Write a review
                    </button>
                    <Link
                      to={`/Blogs/Author/${username}`}
                      className="font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-600 hover:text-white shadow-lg"
                    >
                      Read Blogs
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap items-center">
                    <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                      Reviews: {userData.ratings.length}
                    </p>
                    <Link
                      to={`/Blogs/Author/${username}`}
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
      </div>
    </>
  );
};

export default AuthorProfile;
