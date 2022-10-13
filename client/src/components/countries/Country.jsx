import React from "react";
import s from "./Country.module.css";

const Country = ({ name, flags, continents }) => {
  return (
    <>
      <div className={s.container}>
        <div>
          <img src={flags} alt="Not found img" />
          <div className={s.containerDiv}>
            <h2>{name}</h2>
          </div>
          <h3>continents</h3>
          <h4> {continents}</h4>
        </div>
      </div>
    </>
  );
};

export default Country;
