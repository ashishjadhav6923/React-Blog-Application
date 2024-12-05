import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogCard = ({ title, author, username, id, rating }) => {
  return (
    <Link to={`/Blogs/${id}`}>
      <div className="border rounded-lg shadow-md p-4 h-full w-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">Author : {author}</p>
        <p className="text-gray-600">Username : {username}</p>
        <p className="flex items-center text-gray-600">
          <span className="mr-1">
            <FaStar />
          </span>
          {rating?rating:'00'}/5
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
