import React from "react";
import { professions } from "../constants/constants";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <p className="text-3xl tracking-tight font-extrabold text-gray-900 mb-4">
        Categories
      </p>
      <section className="">
        <div className="container">
          <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {professions.map((profession) => (
              <SingleCard
                CardTitle={profession.split('-').map((word)=>(word.charAt(0).toUpperCase()+word.slice(1))).join(' ')}
                Href={profession}
                CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                Button="View Authors"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

const SingleCard = ({ Button, CardTitle, Href }) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 rounded-lg bg-white shadow-md">
        <Link to={`/Categories/Authors/${Href}`} className="flex items-center justify-center flex-col p-4">
          <p
            className="mb-4 text-xl font-semibold hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
          >
            {CardTitle}
          </p>

          <button
            className="rounded-full border border-gray-3 px-7 py-2 text-base font-medium hover:border-black"
          >
            {Button}
          </button>
        </Link>
      </div>
      {/*  */}
    </>
  );
};
