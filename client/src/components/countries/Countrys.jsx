import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountrys,
  getContinent,
  getActivitys,
  byActivities,
  orderByCountry,
  orderByPopulation,
} from "../../redux/actions/index.js";
import Country from "./Country.jsx";
import SearchBar from "../search/SearchBar.jsx";
import { Link } from "react-router-dom";

const Countrys = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const countries = useSelector((state) => state.getCountries);
  const activities = useSelector((state) => state.getActivities);

  useEffect(() => {
    dispatch(getCountrys());
    dispatch(getActivitys());
  }, [dispatch]);

  const handleLoad = (e) => {
    e.preventDefault();
    dispatch(getCountrys());
    setOrder(e.target.value);
  };

  const handleByContinent = (e) => {
    e.preventDefault();
    dispatch(getContinent(e.target.value));
    setOrder(e.target.value);
  };

  const continents = [...new Set(countries.map((el) => el.continents))];

  const handleByActvity = (e) => {
    e.preventDefault();
    dispatch(byActivities(e.target.value));
    setOrder(e.target.value);
  };

  const handleByOrder = (e) => {
    e.preventDefault();
    dispatch(orderByCountry(e.target.value));
    setOrder(e.target.value);
  };

  const handleByPopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setOrder(e.target.value);
  };

  return (
    <>
      <div>
        <Link to="/form">Form</Link>
      </div>
      <div>
        <div>
          <button type="submit" onClick={(e) => handleLoad(e)}>
            Load Countries
          </button>
        </div>
        <select onChange={(e) => handleByContinent(e)}>
          <option value={"Cont"}>Continents</option>
          <option value={"All"}>All</option>
          {continents.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
        <select onChange={(e) => handleByActvity(e)}>
          <option value="All">Activities</option>
          {activities.map((e) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select>
        <select onChange={(e) => handleByOrder(e)}>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>
        <select onChange={(e) => handleByPopulation(e)}>
          <option value="Max">Population Max</option>
          <option value="Min">Population Min</option>
        </select>
      </div>
      <SearchBar />
      <div>
        <h1>Estas son mis Countrys</h1>
        {countries
          ? countries.map((e) => {
              return (
                <div>
                  <Link to={"/countries/" + e.id}>
                    <Country
                      key={e.id}
                      flags={e.flags}
                      name={e.name}
                      continents={e.continents}
                    />
                  </Link>
                </div>
              );
            })
          : "No hay Countrys"}
      </div>
    </>
  );
};

export default Countrys;
