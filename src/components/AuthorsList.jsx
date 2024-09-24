import React, { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";
import axios from 'axios';
import coolcat from "../assets/images/cool_cat.webp"

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_PATH}/api/user/authors`);
        setAuthors(response.data.authors);
      } catch (error) {
        setError("Error fetching authors");
        console.error(error);
      }
    };

    fetchAuthors();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
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
