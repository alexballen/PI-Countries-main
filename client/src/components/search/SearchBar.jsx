import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameSearch } from "../../redux/actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameSearch(name));
    document.getElementById("search").value = "";
  };

  return (
    <>
      <div>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </>
  );
};

export default SearchBar;
