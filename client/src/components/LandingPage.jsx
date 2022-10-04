import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div>
        <h1>Este es mi LandingPage</h1>
        <Link to="/countries">Ingresa...</Link>
      </div>
    </>
  );
};

export default LandingPage;
