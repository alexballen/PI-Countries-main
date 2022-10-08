import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={s.continer}>
      <nav className={s.navbar}>
        <button className={s.button}>
          <NavLink to="/countries">Countries</NavLink>
        </button>
        <button className={s.button}>
          <NavLink to="/form">Form</NavLink>
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
