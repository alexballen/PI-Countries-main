const { Router } = require("express");
const {
  postActivities,
  getActivities,
} = require("../controler/postactivitiesC.js");

const router = Router();

router.post("/", postActivities);

router.get("/", getActivities);

module.exports = router;
