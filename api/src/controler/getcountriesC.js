const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activities } = require("../db");

const getCountryQ = async (req, res) => {
  const name = req.query.name;

  try {
    if (!name) {
      const allCountry = await Country.findAll({ include: Activities });
      return res.json(allCountry);
    } else {
      const getQName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        include: Activities,
      });
      if (getQName.length === 0) {
        return res
          .status(404)
          .json({ error: `No se encotro el pais con nombre ${name}` });
      } else {
        return res.json(getQName);
      }
    }
  } catch (error) {
    console.log(error + "Error controler getcountriesC function getCountry");
  }
};

module.exports = {
  getCountryQ,
};
