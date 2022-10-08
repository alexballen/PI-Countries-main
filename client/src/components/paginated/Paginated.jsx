import React from "react";
import s from "./Paginated.module.css";

const Paginated = ({ paisesPorPagina, countries, paginado }) => {
  const numPaginas = [];

  for (let i = 1; i <= Math.ceil(countries / paisesPorPagina); i++) {
    numPaginas.push(i);
  }

  return (
    <>
      <nav className={s.paginado}>
        <ul>
          {numPaginas &&
            numPaginas.map((num) => (
              <li key={num}>
                <a href="#" onClick={() => paginado(num)} className={s.active}>
                  {num}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginated;
