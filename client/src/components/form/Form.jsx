import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCountrys, postActivities } from "../../redux/actions/index.js";

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

  const handleChange = (e) => {
    setActivitys({
      ...activitys,
      [e.target.name]: e.target.value,
    });
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
        <Link to="/countries">Home</Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={activitys.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={activitys.difficulty}
            onChange={(e) => handleSelectEnum(e)}
          >
            <option>Choose</option>
            {difficulty.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Duration</label>
          <select
            name="duration"
            value={activitys.duration}
            onChange={(e) => handleSelectEnum(e)}
          >
            <option>Choose</option>
            {duration.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Season</label>
          <select
            name="season"
            value={activitys.season}
            onChange={(e) => handleSelectEnum(e)}
          >
            <option>Choose</option>
            {season.map((s) => (
              <option value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Countries</label>
          <select
            name="activities"
            value={activitys.activities}
            onChange={(e) => handleSelectCountry(e)}
          >
            <option>Choose</option>
            {getCountry.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
          <ul>
            <li>{activitys.countries.map((e) => e + ", ")}</li>
          </ul>
          <button type="submit">Crear Activities</button>
        </div>
      </form>
    </>
  );
};

export default Form;
