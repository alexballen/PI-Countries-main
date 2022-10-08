import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCountrys, postActivities } from "../../redux/actions/index.js";
import NavBar from "../nav/NavBar.jsx";
import s from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const getCountry = useSelector((state) => state.getCountries);

  useEffect(() => {
    dispatch(getCountrys());
  }, [dispatch]);

  const [activitys, setActivitys] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});

  const validationsForms = (form) => {
    let errors = {};

    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!form.name.trim()) {
      errors.name = "Enter a name";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "El campo nombre solo acepta letras y espacios en blanco";
    }

    if (form.difficulty === "Choose") {
      errors.difficulty = "Select a value 1";
    }

    if (form.duration === "Choose") {
      errors.duration = "Select a value 2";
    }

    if (form.season === "Choose") {
      errors.season = "Select a value 3";
    }

    if (form.countries.length === 0) {
      errors.countries = "Select a countries";
    }

    return errors;
  };

  const handleChange = (e) => {
    setActivitys({
      ...activitys,
      [e.target.name]: e.target.value,
    });
    setError(validationsForms(activitys));
  };

  const handleBlur = (e) => {
    handleChange(e);
    setError(validationsForms(activitys));
  };

  const handleSelectEnum = (e) => {
    setActivitys({
      ...activitys,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCountry = (e) => {
    setActivitys({
      ...activitys,
      countries: [...new Set([...activitys.countries, e.target.value])],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postActivities(activitys));
    setError(validationsForms(activitys));
    setActivitys({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    alert("Activities fue creado");
  };

  const difficulty = ["1", "2", "3", "4", "5"];
  const season = ["Summer", "Autumn", "Winter", "Spring"];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <>
      <div>
        <NavBar />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.container}>
          <div className={s.containerDiv}>
            <label>Name</label>
            <input
              name="name"
              autoComplete="off"
              onBlur={(e) => handleBlur(e)}
              value={activitys.name}
              onChange={(e) => handleChange(e)}
              //required
            />
            {error.name ? (
              <h4>
                <small>{error.name}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className={s.containerDiv}>
            <label>Difficulty</label>
            <select
              name="difficulty"
              value={activitys.difficulty}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleSelectEnum(e)}
            >
              <option value="Choose">Choose</option>
              {difficulty.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
            {error.difficulty ? (
              <h4>
                <small>{error.difficulty}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className={s.containerDiv}>
            <label>Duration</label>
            <select
              name="duration"
              value={activitys.duration}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleSelectEnum(e)}
            >
              <option value="Choose">Choose</option>
              {duration.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
            {error.duration ? (
              <h4>
                <small>{error.duration}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className={s.containerDiv}>
            <label>Season</label>
            <select
              name="season"
              value={activitys.season}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleSelectEnum(e)}
            >
              <option value="Choose">Choose</option>
              {season.map((s) => (
                <option value={s}>{s}</option>
              ))}
            </select>
            {error.season ? (
              <h4>
                <small>{error.season}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className={s.containerDiv}>
            <label>Countries</label>
            <select
              name="countrie"
              value={activitys.countries}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleSelectCountry(e)}
            >
              <option>Choose</option>
              {getCountry.map((e) => (
                <option value={e.id}>{e.name}</option>
              ))}
            </select>
            {error.countries ? (
              <h4>
                <small>{error.countries}</small>
              </h4>
            ) : (
              false
            )}
            <div>
              <ul className={s.containerDivDos}>
                <li className={s.flexitem}>
                  {activitys.countries.map((e) => (
                    <button>{e}</button>
                  ))}
                </li>
              </ul>
            </div>

            <button type="submit">Crear Activities</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;

//{Object.keys(error).length < 1 ? false : true}
