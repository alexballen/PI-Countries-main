const { Router } = require("express");
const countries = require("./countriesR.js");
const activities = require("./activitiesR.js");

const router = Router();

router.use("/countries", countries);

router.use("/activities", activities);

module.exports = router;
