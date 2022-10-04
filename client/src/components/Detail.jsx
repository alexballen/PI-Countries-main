import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryId } from "../redux/actions/index.js";
import { Link, useParams } from "react-router-dom";
//import DetailCountry from "./DetailCountry.jsx";

const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const det = useSelector((state) => state.detail);
  console.log("Este console det", det);

  useEffect(() => {
    dispatch(getCountryId(id));
  }, [dispatch, id]);

  function vacio(err = []) {
    if (err.length === 0) {
      return "No hay activities";
    }
  }

  return (
    <>
      <div>
        <Link to="/countries">Home</Link>
      </div>
      <div>
        <h4>Este es mi detail</h4>
        {
          <div>
            <h4>{<img src={det.flags} alt="not found" />}</h4>
            <h4>{det.name}</h4>
            <h4>continents: {det.continents}</h4>
            <h4>capital: {det.capital}</h4>
            <h4>subregion: {det.subregion}</h4>
            <h4>area: {det.area}</h4>
            <h4>population: {det.population}</h4>
            <h3>Activities</h3>
            <h4>{vacio(det.activities)}</h4>
            <h4>
              {det.activities
                ? det.activities.map((e) => {
                    return (
                      <>
                        <h4>name: {e.name}</h4>
                        <h4>difficulty: {e.difficulty}</h4>
                        <h4>duration: {e.duration}</h4>
                        <h4>season: {e.season}</h4>
                      </>
                    );
                  })
                : ""}
            </h4>
          </div>
        }
      </div>
    </>
  );
};

export default Detail;
