import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountrys,
  getContinent,
  getActivitys,
  byActivities,
  orderByCountry,
  orderByPopulation,
  currentPagePaginated,
  byActivityAndContinent,
  getNameSearch,
} from "../../redux/actions/index.js";
import Country from "./Country.jsx";
import { Link } from "react-router-dom";
import Paginated from "../paginated/Paginated.jsx";
import s from "./Countrys.module.css";

const Countrys = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.getCountries);
  const activities = useSelector((state) => state.getActivities);
  const page = useSelector((state) => state.page);

  const [order, setOrder] = useState("");

  const [paginaActual, setPaginaActual] = useState(page);
  const [paisesPorPagina, setPaisesPorPagina] = useState(10);

  const indiceUltimoPais = paginaActual * paisesPorPagina;
  const indicePrimerPais = indiceUltimoPais - paisesPorPagina;
  const paisActual =
    paginaActual === 1
      ? countries.slice(indicePrimerPais, indiceUltimoPais - 1)
      : countries.slice(indicePrimerPais, indiceUltimoPais);

  const paginado = (numPagina) => {
    dispatch(currentPagePaginated(numPagina));
    setPaginaActual(numPagina);
  };

  useEffect(() => {
    if (countries < 1) {
      dispatch(getCountrys());
    }
    dispatch(getActivitys());
  }, [dispatch]);

  const handleLoad = (e) => {
    e.preventDefault();
    dispatch(getCountrys());
    setPaginaActual(page);
    document.getElementById("search").value = "";
  };

  const handleByContinent = (e) => {
    e.preventDefault();
    dispatch(getContinent(e.target.value));
    dispatch(byActivityAndContinent(e.target.value));
    dispatch(currentPagePaginated(1));
    setPaginaActual(1);
    dispatch(getActivitys());
  };

  const continents = [...new Set(countries.map((el) => el.continents))];

  const handleByActvity = (e) => {
    e.preventDefault();
    dispatch(byActivities(e.target.value));
    dispatch(currentPagePaginated(1));
    setPaginaActual(1);
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

  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch(getNameSearch(e.target.value));
    dispatch(currentPagePaginated(1));
    setPaginaActual(1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setPaginaActual(paginaActual - 1);
    dispatch(currentPagePaginated(paginaActual - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setPaginaActual(paginaActual + 1);
    dispatch(currentPagePaginated(paginaActual + 1));
  };

  return (
    <>
      <div className={s.headcontainer}>
        <div className={s.barraNav}>
          <div className={s.titleDiv}>
            <h1>Knowing The World</h1>
          </div>
          <button className={s.buttonLink}>
            <Link className={s.link} to="/form">
              ADD ACTIVITY
            </Link>
          </button>
          <div>
            <input
              className={s.input}
              id="search"
              type="text"
              placeholder="Search..."
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className={s.container}>
          <div className={s.filtros}>
            <button type="submit" onClick={(e) => handleLoad(e)}>
              Load Countries
            </button>
            <select onChange={(e) => handleByContinent(e)}>
              <option value={"Cont"}>Continents</option>
              <option value={"All"}>All</option>
              {continents.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <select onChange={(e) => handleByActvity(e)}>
              <option value="All">Activities</option>
              {activities.map((e, i) => (
                <option key={i} value={e.name}>
                  {e.name}
                </option>
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
          <div>
            <button
              className={s.buttonPage1}
              disabled={paginaActual === 1 ? true : false}
              onClick={handleBack}
            >
              {"<"}
            </button>
            <button className={s.buttonPage2}>{paginaActual}</button>
            <button
              className={s.buttonPage1}
              disabled={paginaActual === 25 ? true : false}
              onClick={handleNext}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className={s.containerDos}>
        {paisActual.length > 0 ? (
          paisActual?.map((e, i) => {
            return (
              <div key={i}>
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
        ) : (
          <div className={s.loadingCountries}>
            {
              <img
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                alt="Not found"
              />
            }
            {<div>{"There are no countries"}</div>}
          </div>
        )}
      </div>
    </>
  );
};

export default Countrys;
