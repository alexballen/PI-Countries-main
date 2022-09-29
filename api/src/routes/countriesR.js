const { Router } = require("express");
const { getCountryQ } = require("../controler/getcountriesC.js");

const router = Router();

router.get("/", getCountryQ);

module.exports = router;
