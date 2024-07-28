import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { navbar } from "../constants/constants";
import logo from "../assets/BlogVerse Logo.svg";
import { logInContext } from "../context/logInContext";
import coolCat from "../assets/images/cool_cat.webp";
const Header = () => {
  const {loginSuccess} = useContext(logInContext);
  return (
    <header className="sticky top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="BlogVerse Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              BlogVerse
            </span>
          </NavLink>
          <div className="flex items-center lg:order-2">
            {!loginSuccess && (
              <>
                <NavLink
                  to="/logIn"
                  className={({ isActive }) =>
                    `font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-600 hover:text-white ${
                      isActive ? "bg-blue-600 text-white" : ""
                    }`
                  }
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signIN"
                  className={({ isActive }) =>
                    `font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-600 hover:text-white ${
                      isActive ? "bg-blue-600 text-white" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
            {loginSuccess && (
              <NavLink to="/Profile">
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 hover:scale-105 cursor-pointer"
                  src={coolCat}
                  alt="Bordered avatar"
                />
              </NavLink>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navbar.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 border-b border-gray-100 hover:text-blue-600 lg:border-0 lg:p-0 ${
                        isActive ? "text-blue-600" : "text-black"
                      }`
                    }
                    aria-current="page"
                  >
                    {item.Name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
