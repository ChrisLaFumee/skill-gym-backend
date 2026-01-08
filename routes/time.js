const express = require("express");
const router = express.Router();

const { getTime } = require("../controllers/timeController");
const { echoMessage } = require("../controllers/timeController");

router.get("/", getTime);
router.post("/", echoMessage);

module.exports = router;
