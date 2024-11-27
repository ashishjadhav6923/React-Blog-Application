import React, { useEffect } from "react";
import Hero from "./hero";
import Features from "./features";
import BlogList from "./BlogList";

const Home = () => {
  return (
    <div className="h-fit">
      <Hero />
      <BlogList />
      <Features />
    </div>
  );
};

export default Home;
