import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const BlogList = () => {
  let api_path = `${import.meta.env.VITE_API_PATH}/api/readBlogs`;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(api_path);
        setBlogs(response.data.blogs.reverse());
      } catch (error) {
        setError("Error fetching blogs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:py-6">
      <h1 className="text-2xl font-semibold mb-4">Recent Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            author={blog.author}
            username={blog.profile}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
