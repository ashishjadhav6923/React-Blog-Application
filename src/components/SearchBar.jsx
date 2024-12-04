import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchBar = ({ data,type }) => {
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const getFilteredItems = (query, items) => {
    if (!query) return [];
    if(type=='author'){
        return items.filter((item) =>
          item.name.toLowerCase().includes(query?.toLowerCase())
        );
    }
    if(type=='blog'){
        return items.filter((item) =>
            item.title.toLowerCase().includes(query?.toLowerCase())
          );
    }
  };

  const filteredItems = getFilteredItems(query, data);

  return (
    <div
      className="my-4 relative"
      onFocus={() => setIsDropdownVisible(true)}
      onBlur={(e) => {
        // Ensure dropdown closes only when focus leaves the entire search bar
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDropdownVisible(false);
        }
      }}
    >
      <label
        htmlFor="input"
        className="flex items-center justify-between gap-2 p-2 rounded-full bg-white shadow-md h-12"
      >
        <span className="px-2">
          <IoIosSearch />
        </span>
        <input
          id="input"
          className="rounded-full w-full outline-none px-1"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {isDropdownVisible && (
        <div className="absolute sm:w-96 flex flex-col bg-transparent">
          {filteredItems.map((item, index) => (
            <Link
              to={type=='blog'?`/Blogs/${item.id}`:`/Authors/profile/${item.username}`}
              key={index}
              className="bg-white rounded-xl p-4 border-2 text-start"
            >
              {type=='author'?item.name:item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
