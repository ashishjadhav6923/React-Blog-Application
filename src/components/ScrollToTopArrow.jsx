import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopArrow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const visibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(()=>{
    window.addEventListener('scroll',visibility);
  },[])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollTop}
          className="bg-white p-2 shadow-lg shadow-gray-400 rounded-full fixed z-50 sm:right-10 sm:bottom-10 right-8 bottom-8 hover:border-2"
        >
          <IoIosArrowUp size={24} color="black" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopArrow;
