import React from "react";
import { useDispatch } from "react-redux";
import { getNameSearch } from "../../redux/actions/index.js";
import s from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch(getNameSearch(e.target.value));
  };

  return (
    <>
      <div>
        <input
          className={s.input}
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </>
  );
};

export default SearchBar;
