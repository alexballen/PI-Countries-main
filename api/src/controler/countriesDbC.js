const axios = require("axios");
const { Country, Activities } = require("../db");

const getCountryApi = async () => {
  try {
    const getApi = await axios.get("https://restcountries.com/v3/all");

    const gApi = getApi.data.map((e) => {
      let obj = {
        id: e.cca3,
        name: e.name.common,
        flags: e.flags[0],
        continents: e.continents[0],
        capital: e.capital ? e.capital[0] : "Not found",
        subregion: e.subregion ? e.subregion : "Not found",
        area: e.area,
        population: e.population,
      };
      return obj;
    });

    await Country.bulkCreate(gApi);

    /* gApi.forEach(async (e) => {
      await Country.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          flags: e.flags,
          continents: e.continents,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        },
      });
    }); */

    const allCountries = await Country.findAll({
      include: Activities,
    });

    return allCountries;
  } catch (error) {
    console.log(error + "Error controler countriesDbC function getCountryApi");
  }
};

module.exports = {
  getCountryApi,
};
