const { Country, Activities } = require("../db");

/* const validador = (data) => {
  let errores = {};
   if (typeof date !== "string") {
    errores.date = "Debes ingresar un texto";
  } else if (data.length > 5) {
    return (errores.name = "El texto ingresado debe se menor a 50 caracteres");
  } else if (data.length <= 2) {
    return (errores = "El texto ingresado debe ser mayor a 2 caracteres");
  }
  return errores;
}; */

const postActivities = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  /* if (name) {
    if (Object.keys(validador(name)).length > 0) {
      return res.status(404).json(validador());
    }
  } */

  try {
    const activCreated = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    await activCreated.setCountries(countries);

    const activitys = await Activities.findOne({
      where: {
        name: name,
      },
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });

    return res.json(activitys);
  } catch (error) {
    console.log(
      error + " Error en controler postactivitiesC -> postActivities"
    );
  }
};

const getActivities = async (_req, res) => {
  try {
    const getA = await Activities.findAll({ include: Country });

    return res.json(getA);
  } catch (error) {
    console.log(error + " Error controler getcountriesC -> getActivities");
  }
};

module.exports = {
  postActivities,
  getActivities,
};
