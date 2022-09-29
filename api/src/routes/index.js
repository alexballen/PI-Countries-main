const { Router } = require("express");
const { Country, Activities } = require("../db");
const { postActivities } = require("../controler/postactivitiesC.js");
const countries = require("./countriesR.js");

const router = Router();

router.use("/countries", countries);

router.post("/activities", postActivities);

module.exports = router;
