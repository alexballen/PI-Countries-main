import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountrys,
  postActivities,
  getActivitys,
} from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import s from "./Form.module.css";

const validationsForms = (form) => {
  let errors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.name.trim()) {
    errors.name = "Enter a name";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "The name field only accepts letters and blank spaces";
  }

  if (form.difficulty === "") {
    errors.difficulty = "Select a value";
  } else if (form.difficulty === "Choose") {
    errors.difficulty = "Select a value";
  }

  if (form.duration === "") {
    errors.duration = "Select a value";
  } else if (form.duration === "Choose") {
    errors.duration = "Select a value";
  }

  if (form.season === "") {
    errors.season = "Select a season";
  } else if (form.season === "Choose") {
    errors.season = "Select a season";
  }

  if (form.countries.length === 0) {
    errors.countries = "Select the countries for this activity";
  }

  return errors;
};

const Form = () => {
  const dispatch = useDispatch();
  const getCountry = useSelector((state) => state.getCountries);
  const getActivities = useSelector((state) => state.getActivities);

  const [activitys, setActivitys] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getCountrys());
    dispatch(getActivitys());
  }, [dispatch]);

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
    if (!activitys.name) {
      alert("You must enter a Name");
    } else if (
      getActivities.find(
        (e) => e.name.toLowerCase() === activitys.name.toLowerCase()
      )
    ) {
      alert("The entered country name already exists");
    } else if (activitys.difficulty === "") {
      alert("You must select a value in the Difficulty field");
    } else if (activitys.duration === "") {
      alert("You must select a value in the Duration field");
    } else if (activitys.season === "") {
      alert("You must select a Season");
    } else {
      dispatch(postActivities(activitys));
      setError(validationsForms(activitys));
      setActivitys({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      alert("Activities was created successfully");
    }
  };

  const handleDelete = (e) => {
    setActivitys({
      ...activitys,
      countries: activitys.countries.filter((c) => c !== e),
    });
  };

  const difficulty = ["1", "2", "3", "4", "5"];
  const season = ["Summer", "Autumn", "Winter", "Spring"];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <>
      <div className={s.contButton}>
        <button className={s.button}>
          <Link to="/countries">Home</Link>
        </button>
      </div>
      <div className={s.containerFull}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.containerForm}>
            <div className={s.containerActivitys}>
              <label>Name</label>
              <input
                name="name"
                autoComplete="off"
                onBlur={(e) => handleBlur(e)}
                value={activitys.name}
                onChange={(e) => handleChange(e)}
              />
              {error.name ? (
                <h4>
                  <small>{error.name}</small>
                </h4>
              ) : (
                false
              )}
            </div>
            <div className={s.containerActivitys}>
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={activitys.difficulty}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSelectEnum(e)}
              >
                <option value="Choose">Choose</option>
                {difficulty.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
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
            <div className={s.containerActivitys}>
              <label>Duration</label>
              <select
                name="duration"
                value={activitys.duration}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSelectEnum(e)}
              >
                <option value="Choose">Choose</option>
                {duration.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
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
            <div className={s.containerActivitys}>
              <label>Season</label>
              <select
                name="season"
                value={activitys.season}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSelectEnum(e)}
              >
                <option value="Choose">Choose</option>
                {season.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
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
            <div className={s.containerActivitys}>
              <label>Countries</label>
              <select
                name="countrie"
                value={activitys.countries}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSelectCountry(e)}
              >
                <option>Choose</option>
                {getCountry.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              {error.countries ? (
                <h4>
                  <small>{error.countries}</small>
                </h4>
              ) : (
                false
              )}
              <button
                type="submit"
                disabled={Object.keys(error).length < 1 ? false : true}
              >
                Create activities
              </button>
            </div>
          </div>
        </form>
        <div>
          <ul className={s.containerUl}>
            <li className={s.containerLi}>
              {activitys.countries.map((e, i) => (
                <button key={i} className={s.buttonMap}>
                  {e}
                  <button className={s.buttonX} onClick={() => handleDelete(e)}>
                    X
                  </button>
                </button>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Form;
