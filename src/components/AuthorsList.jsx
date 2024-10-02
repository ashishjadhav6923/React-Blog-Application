import React, { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";
import axios from 'axios';
import coolcat from "../assets/images/cool_cat.webp"

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_PATH}/api/user/authors`);
        setAuthors(response.data.authors);
      } catch (error) {
        setError("Error fetching authors");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p className="max-w-screen-xl mx-auto min-h-96">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto min-h-96">
      {authors.map((author, index) => (
        <AuthorCard
          key={index}
          image={author.img}
          name={author.name}
          profession={author.profession}
          username={author.username}
        />
      ))}
    </div>
  );
};

export default AuthorsList;
