import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { useParams } from "react-router-dom";

const BlogList = ({ limit }) => {
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topRatedFilter, setTopRatedFilter] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); // Ensure loading state is updated before fetching
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/getBlogs${
            param.category ? "/" + param.category : ""
          }`
        );
        setFetchedBlogs(response?.data?.blogs || []);
      } catch (error) {
        setError("Error fetching blogs");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchBlogs();
  }, [param.category]);

  if (loading) return <p className="max-w-screen-xl mx-auto">Loading...</p>;
  if (error) return <p>{error}</p>;

  // Compute derived states based on fetchedBlogs
  const blogs = [...fetchedBlogs].reverse();
  const topRatedBlogs = [...fetchedBlogs].sort((a, b) => b.averageRating - a.averageRating);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center gap-4 justify-between">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 mb-4">
          {`Blogs ${param.category ? "of " + param.category : ""}`}
        </h1>

        <div className="inline-flex rounded-md shadow-sm my-2" role="group">
          <button
            onClick={() => setTopRatedFilter(false)}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-600 ${
              !topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setTopRatedFilter(true)}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-600 ${
              topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fetchedBlogs && fetchedBlogs.length > 0  ? (
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
          <p>Blogs not available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
