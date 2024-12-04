import React, { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const AuthorsList = () => {
  const [fetchedAuthors, setfetchedAuthors] = useState([]);
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
        setfetchedAuthors(response?.data?.authors || []);
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
  const authors = [...fetchedAuthors].reverse();
  const topRatedAuthors = [...authors].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="max-w-screen-xl mx-auto min-h-96">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <h1 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900">
          Authors {`${param.category ? "of " + param.category : ""}`}
        </h1>
        <div className="sm:block hidden">
          <SearchBar data={authors} type={"author"} />
        </div>
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
      <div className="sm:hidden">
        <SearchBar data={authors} type={"author"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {authors && authors.length > 0 ? (
          <>
            {!topRatedFilter &&
              authors.map((author, index) => (
                <AuthorCard
                  key={index}
                  name={author.name}
                  username={author.username}
                  profession={author.profession}
                  image={author.img}
                  blogs={author.blogs}
                  averageRating={author.averageRating}
                />
              ))}
            {topRatedFilter &&
              topRatedAuthors.map((author, index) => (
                <AuthorCard
                  key={index}
                  name={author.name}
                  username={author.username}
                  profession={author.profession}
                  image={author.img}
                  blogs={author.blogs}
                  averageRating={author.averageRating}
                />
              ))}
          </>
        ) : (
          <p className="">Authors not available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorsList;
