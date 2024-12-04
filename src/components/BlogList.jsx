import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { NavLink, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { BsArrowRight } from "react-icons/bs";

const BlogList = ({ limit }) => {
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topRatedFilter, setTopRatedFilter] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/getBlogs${param.category ? "/" + param.category : ""}`
        );
        setFetchedBlogs(response?.data?.blogs || []);
      } catch (error) {
        setError("Error fetching blogs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [param.category]);

  if (loading) return <p className="max-w-screen-xl mx-auto">Loading...</p>;
  if (error) return <p>{error}</p>;

  const blogs = [...fetchedBlogs].reverse();
  const topRatedBlogs = [...fetchedBlogs].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 mb-4">
          {`Blogs ${param.category ? "of " + param.category : ""}`}
        </h1>
        <div className="sm:block hidden">
          <SearchBar data={fetchedBlogs} type={"blog"} />
        </div>
        <div className="inline-flex rounded-md shadow-sm my-2" role="group">
          <button
            onClick={() => {
              setTopRatedFilter(false);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-600 ${
              !topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => {
              setTopRatedFilter(true);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-600 ${
              topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className="sm:hidden block">
        <SearchBar data={fetchedBlogs} type={"blog"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fetchedBlogs && fetchedBlogs.length > 0 ? (
          <>
            {!topRatedFilter &&
              blogs
                .slice(0, limit || blogs.length)
                .map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={
                      blog.title.length > 60
                        ? blog.title.substring(0, 60) + "..."
                        : blog.title
                    }
                    author={blog.author.name || ""}
                    username={blog.username}
                    rating={blog.averageRating.toFixed(2)}
                  />
                ))}
            {topRatedFilter &&
              topRatedBlogs
                .slice(0, limit || topRatedBlogs.length)
                .map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={
                      blog.title.length > 60
                        ? blog.title.substring(0, 60) + "..."
                        : blog.title
                    }
                    author={blog.author.name || ""}
                    username={blog.username}
                    rating={blog.averageRating.toFixed(2)}
                  />
                ))}
          </>
        ) : (
          <p className="">Blogs not available for this category.</p>
        )}
      </div>
      {limit && (
        <NavLink
          to="/Blogs"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 my-4"
        >
          <span className="flex items-center justify-center gap-4">
            See all <BsArrowRight />
          </span>
        </NavLink>
      )}
    </div>
  );
};

export default BlogList;
