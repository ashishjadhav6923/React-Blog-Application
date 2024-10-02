import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ title, author, username, id }) => {
  return (
    <Link to={`/Blogs/${id}`}>
      <div className="border rounded-lg shadow-md p-4 h-full w-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">Author : {author}</p>
        <p className="text-gray-600">Username : {username}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
