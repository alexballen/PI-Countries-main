import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryId, clear } from "../../redux/actions/index.js";
import { useParams, Link } from "react-router-dom";
import s from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const det = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getCountryId(id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  function vacio(err = []) {
    if (err.length === 0) {
      return "No activities";
    }
  }

  return (
    <>
      <div className={s.contButton}>
        <button className={s.button}>
          <Link to="/countries">Home</Link>
        </button>
      </div>
      <div className={s.containerTotal}>
        <div className={s.container}>
          <div className={s.contTitle}>
            <h1>Country Detail</h1>
          </div>
          {
            <div className={s.regisDiv}>
              <div className={s.contImg}>
                {<img src={det.flags} alt="not found" />}
              </div>
              <div className={s.contName}>
                <h1>{det.name}</h1>
              </div>
              <h2>Continents</h2>
              <h3>{det.continents}</h3>
              <h2>Capital</h2>
              <h3> {det.capital}</h3>
              <h2>Subregion</h2>
              <h3>{det.subregion}</h3>
              <h2>Area</h2>
              <h3> {det.area}</h3>
              <h2>Population</h2>
              <h3>{det.population}</h3>
            </div>
          }
        </div>
        <div>
          <h3 className={s.title}>Activities</h3>
          <h3>{vacio(det.activities)}</h3>

          <h3>
            {det.activities
              ? det.activities.map((e, i) => {
                  return (
                    <>
                      <div key={i} className={s.contActvities}>
                        <h3 className={s.controlDiv}>
                          Name<p>{e.name}</p>
                        </h3>

                        <h3 className={s.controlDiv}>
                          difficulty<p>{e.difficulty}</p>
                        </h3>

                        <h3 className={s.controlDiv}>
                          duration<p>{e.duration}</p>
                        </h3>

                        <h3 className={s.controlDiv}>
                          season <p>{e.season}</p>
                        </h3>
                      </div>
                    </>
                  );
                })
              : ""}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Detail;
