import React, { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [topRatedAuthors, settopRatedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topRatedFilter, setTopRatedFilter] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PATH}/api/user/authors${param.category ? "/" + param.category : ""}`
        );
        const fetchedAuthors = response.data.authors;
        setAuthors([...fetchedAuthors].reverse());
        settopRatedAuthors(
          [...fetchedAuthors].sort((a, b) => b.averageRating - a.averageRating)
        );
      } catch (error) {
        setError("Error fetching authors");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading)
    return <p className="max-w-screen-xl mx-auto min-h-96">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto min-h-96">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <h1 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900">
          Authors {`${param.category ? "of " + param.category : ""}`}
        </h1>
        <div className="inline-flex rounded-md shadow-sm my-2" role="group">
          <button
            onClick={() => {
              setTopRatedFilter(false);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-600 ${!topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""}`}
          >
            Recent
          </button>
          <button
            onClick={() => {
              setTopRatedFilter(true);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-600 ${topRatedFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""}`}
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {!topRatedFilter && authors
          ? authors.map((author, index) => (
              <AuthorCard
                key={index}
                name={author.name}
                username={author.username}
                profession={author.profession}
                image={author.img}
                blogs={author.blogs}
                averageRating={author.averageRating}
              />
            ))
          : !topRatedFilter &&
            `Authors with profession ${param.category} not found`}
        {topRatedFilter && authors
          ? topRatedAuthors.map((author, index) => (
              <AuthorCard
                key={index}
                name={author.name}
                username={author.username}
                profession={author.profession}
                image={author.img}
                blogs={author.blogs}
                averageRating={author.averageRating}
              />
            ))
          : topRatedFilter &&
            `Authors with profession ${param.category} not found`}
      </div>
    </div>
  );
};

export default AuthorsList;
