import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { CgProfile } from "react-icons/cg";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/readBlog/${blogId}`
        );
        console.log(response.data.blog);
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
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="max-w-screen-lg sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 whitespace-pre-wrap">
            {blog.title}
          </h2>

          <Link to={`/Authors/profile/${blog.username}`} className="">
            <div className="flex items-center gap-2 my-2">
              Author :
              <span className="text-blue-500 flex items-center gap-1">
              <CgProfile />
              {blog.author.name}
              </span>
            </div>
          </Link>
          <p className="mb-4 font-medium whitespace-pre-wrap">{blog.content}</p>
          {blog.additionalInfo && (
            <p className="mb-4 inline-flex items-center font-medium whitespace-pre-wrap">
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
