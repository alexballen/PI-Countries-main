import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameSearch } from "../../redux/actions/index.js";
import s from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const allCountry = useSelector((state) => state.getCountries);
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !allCountry.find(
        (e) =>
          e.name.toLowerCase().startsWith(name.toLowerCase()) ===
          name.toLowerCase().startsWith(name.toLowerCase())
      )
    ) {
      alert("The searched name was not found");
      document.getElementById("search").value = "";
    } else {
      dispatch(getNameSearch(name));
      document.getElementById("search").value = "";
    }
  };

  return (
    <>
      <div className={s.container}>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          <img src="icoSearch.png" alt="" />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
