const express = require("express");
const router = express.Router();

const {
  getChallenges,
  getChallenge,
  createChallenge,
  deleteChallenge,
} = require("../controllers/challengesController");

router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.post("/", createChallenge);
router.delete("/:id", deleteChallenge);

module.exports = router;
