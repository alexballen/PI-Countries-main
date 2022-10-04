const { Router } = require("express");
const { getCountryQ, getCountryP } = require("../controler/getcountriesC.js");

const router = Router();

router.get("/", getCountryQ);

router.get("/:id", getCountryP);

module.exports = router;
