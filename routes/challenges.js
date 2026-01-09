const express = require("express");
const router = express.Router();

const {
  getChallenges,
  createChallenge,
} = require("../controllers/challengesController");

router.get("/", getChallenges);
router.post("/", createChallenge);

module.exports = router;
