import React from "react";

const Country = ({ name, flags, continents }) => {
  return (
    <>
      <div>
        <img src={flags} alt="Not found img" width={350} height={250} />
        <h3>{name}</h3>
        <h4>continents: {continents}</h4>
      </div>
    </>
  );
};

export default Country;
