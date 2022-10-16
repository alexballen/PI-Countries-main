const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activities } = require("../db");

const getCountryQ = async (req, res) => {
  const name = req.query.name;

  try {
    const allCountry = await Country.findAll({ include: Activities });
    if (!name) {
      return res.json(allCountry);
    } else {
      const getQName = await allCountry.filter((e) =>
        e.name.toLowerCase().startsWith(name.toLowerCase())
      );
      getQName.length
        ? res.json(getQName)
        : res
            .status(404)
            .json({ error: `No se encontro el pais con nombre ${name}` });
      /* const getQName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        include: Activities,
      }); */
      /* if (getQName.length === 0) {
        return res
          .status(404)
          .json({ error: `No se encontro el pais con nombre ${name}` });
      } else {
        return res.json(getQName);
      } */
    }
  } catch (error) {
    console.log(error + " Error controler getcountriesC -> getCountry");
  }
};

const getCountryP = async (req, res) => {
  const id = req.params.id.toUpperCase();

  try {
    if (id) {
      const country = await Country.findOne({
        where: {
          id: id,
        },
        include: Activities,
      });
      return res.json(country);
    } else {
      return res.status(404).send("No detail");
    }

    /* const countryId = await Country.findByPk(id, { include: Activities });
    res.json(countryId); */
  } catch (error) {
    console.log(error + " Error controler getcountriesC -> getCountryP");
  }
};

const deletCountry = (req, res) => {
  const { id } = req.params;

  /*  if (id) {
    const eliminado = Country.findByPk(id, { include: Activities });
  } */
};

module.exports = {
  getCountryQ,
  getCountryP,
};
