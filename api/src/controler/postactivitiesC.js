const { Country, Activities } = require("../db");

const validador = (date) => {
  let errores = {};
  if (typeof date !== "string") {
    return (errores.date = "Debes ingresar un texto");
  }

  if (date.length > 5) {
    return (errores.name = "El texto ingresado debe se menor a 50 caracteres");
  }

  if (date.length <= 2) {
    return (errores = "El texto ingresado debe ser mayor a 2 caracteres");
  }
  return errores;
};

const postActivities = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  /* if (name) {
    if (Object.keys(validador(name)).length > 0) {
      return res.json(validador());
    }
  } */

  try {
    const activCreated = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    //pendiente probar con addCountries
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
