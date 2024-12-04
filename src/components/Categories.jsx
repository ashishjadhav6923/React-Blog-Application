import React, { useState } from "react";
import { blogCategories, professions } from "../constants/constants";
import { Link } from "react-router-dom";

const Categories = () => {
  const [blogFilter, setblogFilter] = useState(false);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center gap-4 justify-between">
        <p className="text-3xl tracking-tight font-extrabold text-gray-900 mb-4">
          Categories
        </p>
        <div className="inline-flex rounded-md shadow-sm my-2" role="group">
          <button
            onClick={() => {
              setblogFilter(false);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-600 ${!blogFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""}`}
          >
            Authors
          </button>
          <button
            onClick={() => {
              setblogFilter(true);
            }}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-600 ${blogFilter ? "z-10 ring-1 ring-blue-600 text-blue-600" : ""}`}
          >
            Blogs
          </button>
        </div>
      </div>
      <section className="">
        <div className="container">
          <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {!blogFilter &&
              professions.sort().map((profession, index) => (
                <SingleCard
                  key={index}
                  CardTitle={profession
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  Href={profession}
                  CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                  Button="View Authors"
                  type="user"
                />
              ))}
            {blogFilter &&
              blogCategories.sort().map((category, index) => (
                <SingleCard
                  key={index}
                  CardTitle={category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  Href={category}
                  CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                  Button="View Blogs"
                  type="blog"
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

const SingleCard = ({ Button, CardTitle, Href, type }) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 rounded-3xl bg-white shadow-md">
        <Link
          to={`/Categories/${type == "user" ? "Authors" : "Blogs"}/${Href}`}
          className="flex items-center justify-center flex-col p-4"
        >
          <p className="mb-4 text-xl font-semibold hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
            {CardTitle}
          </p>

          <button className="rounded-full border border-gray-3 px-7 py-2 text-base font-medium hover:border-black">
            {Button}
          </button>
        </Link>
      </div>
      {/*  */}
    </>
  );
};
