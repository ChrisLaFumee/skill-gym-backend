const express = require("express");
const router = express.Router();

const {
  getChallenges,
  getChallenge,
  createChallenge,
} = require("../controllers/challengesController");

router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.post("/", createChallenge);

module.exports = router;
