import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AuthorCard = ({ image, name, profession, username, averageRating }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 h-full w-full">
      <div className="flex flex-col items-center py-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={image}
          alt={`${name} image`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
        <span className="flex gap-4 text-sm text-gray-500">
          <p>{profession.split('-').map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ')}</p>
          <p className="flex items-center text-gray-600">
            <span className="mr-1">
              <FaStar />
            </span>
            {averageRating ? averageRating.toFixed(2) : "00"}/5
          </p>
        </span>

        <div className="flex mt-4 md:mt-6">
          <Link
            to={`/Blogs/Author/${username}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Read blogs
          </Link>
          <Link
            to={`/Authors/profile/${username}`}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
