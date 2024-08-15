import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  const apiPath = `${import.meta.env.VITE_API_PATH}/api/readBlogs/${blogId}`;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(apiPath);
        setBlog(response.data.blog);
        console.log(blog);
      } catch (error) {
        setError("Error fetching blog");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [apiPath, blogId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>No blog found</p>;

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="max-w-screen-lg text-gray-500 sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">
            {blog.title}
          </h2>
          <p className="mb-4 font-light">Author: {blog.author}</p>
          <p className="mb-4 font-medium">{blog.content}</p>
          {blog.additionalInfo && (
            <p className="mb-4 inline-flex items-center font-medium">
              Additional info: {blog.additionalInfo}
            </p>
          )}
          <p className="mb-4 font-medium">Blog Id: {blog.id}</p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
