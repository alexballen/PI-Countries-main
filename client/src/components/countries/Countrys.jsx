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
import Paginated from "../paginated/Paginated.jsx";
import s from "./Countrys.module.css";

const Countrys = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.getCountries);
  const activities = useSelector((state) => state.getActivities);

  const [order, setOrder] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [paisesPorPagina, setPaisesPorPagina] = useState(10);

  const indiceUltimoPais = paginaActual * paisesPorPagina;
  const indicePrimerPais = indiceUltimoPais - paisesPorPagina;
  const paisActual =
    paginaActual === 1
      ? countries.slice(indicePrimerPais, indiceUltimoPais - 1)
      : countries.slice(indicePrimerPais, indiceUltimoPais);

  const paginado = (numPagina) => {
    setPaginaActual(numPagina);
  };

  useEffect(() => {
    dispatch(getCountrys());
    dispatch(getActivitys());
  }, [dispatch]);

  const handleLoad = (e) => {
    e.preventDefault();
    dispatch(getCountrys());
    setPaginaActual(1);
  };

  const handleByContinent = (e) => {
    e.preventDefault();
    dispatch(getContinent(e.target.value));
    setPaginaActual(1);
  };

  const continents = [...new Set(countries.map((el) => el.continents))];

  const handleByActvity = (e) => {
    e.preventDefault();
    dispatch(byActivities(e.target.value));
    /* setOrder(e.target.value); */
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
      <div className={s.barraNav}>
        <h1>Knowing The World</h1>
        <button>
          <Link className={s.link} to="/form">
            ADD ACTIVITY
          </Link>
        </button>
        <SearchBar />
      </div>
      <div className={s.container}>
        <div className={s.filtros}>
          <button type="submit" onClick={(e) => handleLoad(e)}>
            Load Countries
          </button>
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
            <option>Order</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>
          <select onChange={(e) => handleByPopulation(e)}>
            <option>Population</option>
            <option value="Max">Population Max</option>
            <option value="Min">Population Min</option>
          </select>
        </div>
        <Paginated
          paisesPorPagina={paisesPorPagina}
          countries={countries.length}
          paginado={paginado}
        />
      </div>
      <div className={s.containerDos}>
        {paisActual
          ? paisActual.map((e) => {
              return (
                <div>
                  <Link className={s.link2} to={"/countries/" + e.id}>
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
