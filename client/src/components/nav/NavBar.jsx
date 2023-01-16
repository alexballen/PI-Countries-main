import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={s.container}>
      <nav className={s.navbar}>
        <button className={s.button}>
          <NavLink to="/countries">Home</NavLink>
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
