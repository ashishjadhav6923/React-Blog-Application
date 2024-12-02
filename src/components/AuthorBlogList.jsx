import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { useParams } from "react-router-dom";

const AuthorBlogList = () => {
  const { username } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/Blogs/${username}`
        );
        setBlogs(response.data.blogs.reverse());
      } catch (error) {
        setError(`Error fetching blogs of ${username}`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="max-w-screen-xl mx-auto min-h-96">Loading...</p>;
  if (error) return <p className="max-w-screen-xl mx-auto min-h-96">{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto min-h-96">
      <h1 className="text-2xl font-semibold mb-4">Blogs of {username}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length?blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={
              blog.title.length > 60
                ? blog.title.substring(0, 60) + "..."
                : blog.title
            }
            author={blog.author.name}
            username={blog.username}
          />
        )):<p className="">This author hasn't written any blogs yet.</p>}
      </div>
    </div>
  );
};

export default AuthorBlogList;
