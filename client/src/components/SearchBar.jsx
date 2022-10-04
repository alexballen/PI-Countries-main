import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameSearch } from "../redux/actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameSearch(name));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          autoComplete="on"
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
