import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  /*  const handleInputChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCard(id));
    //document.getElementById("search").value = "";
  };

  return (
    <>
      <div>
        {/* <input
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        /> */}
      </div>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        X
      </button>
    </>
  );
};

export default SearchBar;
