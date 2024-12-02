import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { CgProfile } from "react-icons/cg";
import ReviewModal from "./ReviewModal";
import { HiMail } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  const [toggleReview, settoggleReview] = useState(false);
  const [reviewToggle, setreviewToggle] = useState(false);
  const toggleReviewModal = () => {
    settoggleReview(!toggleReview);
  };
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/readBlog/${blogId}`
        );
        setBlog(response.data.blog);
      } catch (error) {
        setError("Error fetching blog");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>No blog found</p>;

  return (
    <section className="">
      {toggleReview && (
        <ReviewModal
          toggleReview={toggleReview}
          toggleReviewModal={toggleReviewModal}
          Data={blog}
          type="blog"
        />
      )}

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6">
        <div className="flex w-full justify-between py-2">
          <p className="font-medium flex items-center">
            <span className="mr-1">
              <FaStar />
            </span>
            {blog.averageRating.toFixed(2)}/5
          </p>
          <span className="flex gap-2">
            <button
              onClick={toggleReviewModal}
              className="font-medium rounded-lg text-sm p-2 py-0 sm:py-2 hover:bg-blue-600 hover:text-white shadow-lg border-2"
            >
              Write a review
            </button>
            <a
              href="#reviews"
              onClick={() => {
                setreviewToggle(!reviewToggle);
              }}
              className="font-medium rounded-lg text-sm p-2 py-0 sm:py-2 hover:bg-blue-600 hover:text-white shadow-lg border-2"
            >
              See reviews
            </a>
          </span>
        </div>
        <div className="sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 whitespace-pre-wrap">
            {blog.title}
          </h2>

          <Link
            to={`/Authors/profile/${blog.username}`}
            className="block w-fit"
          >
            <div className="flex items-center gap-2 my-2">
              Author :
              <span className="text-blue-500 flex items-center gap-1">
                <CgProfile />
                {blog.author.name}
              </span>
            </div>
          </Link>
          <p className="mb-4 font-medium whitespace-pre-wrap text-justify overflow-scroll">
            {blog.content}
          </p>
          {blog.additionalInfo && (
            <p className="mb-4 inline-flex items-center font-medium whitespace-pre-wrap">
              Additional info: {blog.additionalInfo}
            </p>
          )}
          <p className="mb-4 font-medium">Blog Id: {blog.id}</p>
        </div>
        {reviewToggle && (
          <div className="my-10">
            <div className="flex justify-between">
              <p className="font-semibold text-[1.5rem] m-2">Reviews :</p>
              <Link
                id="reviews"
                onClick={() => {
                  setreviewToggle(!reviewToggle);
                }}
                className="font-medium rounded-lg text-sm p-2 hover:bg-blue-600 hover:text-white shadow-lg border-2 h-10"
              >
                {!reviewToggle ? "see" : "close"} reviews
              </Link>
            </div>
            {blog.ratings.length?blog.ratings.map((rating, index) => {
              return (
                <div
                  className="shadow-lg drop-shadow-xl flex flex-col sm:flex-row mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 h-fit w-fit justify-center sm:items-center max-w-5xl min-w-full sm:min-w-0"
                  key={index}
                >
                  <img
                    className="shrink-0 rounded-2xl h-24 w-24 object-left-top object-cover m-2"
                    src={rating.raterImg}
                    alt={`${rating.raterName}'s Avatar`}
                  />
                  <div className="flex flex-col justify-center gap-2 p-4">
                    <p>
                      <span className="font-semibold">Name :</span>{" "}
                      {rating.raterName}
                    </p>
                    <p className="text-justify">
                      <span className="font-semibold">Message :</span>{" "}
                      {rating.message}
                    </p>
                    <div className="flex">
                      <span className="font-semibold">Rating : </span>
                      <Rating style={{ maxWidth: 100 }} value={rating.rating} />
                    </div>
                  </div>
                </div>
              );
            }):<p className="m-2">No reviews</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
