import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <div>
        <div className={s.container}>
          <button className={s.button}>
            <Link className={s.link} to="/countries">
              Go...
            </Link>
          </button>
          <div>
            <p>Knowing The World</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
