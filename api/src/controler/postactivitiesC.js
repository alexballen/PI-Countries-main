const { Country, Activities } = require("../db");

const postActivities = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const activCreated = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    await activCreated.setCountries(countries);

    const infActi = await Activities.findOne({
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

    res.json(infActi);
  } catch (error) {
    console.log(error + "Error en controler postActivities");
  }
};

module.exports = {
  postActivities,
};
