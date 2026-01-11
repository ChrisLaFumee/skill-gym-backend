const express = require("express");
const router = express.Router();

const {
  getChallenges,
  getChallenge,
  createChallenge,
  deleteChallenge,
  updateChallenge,
} = require("../controllers/challengesController");

router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.post("/", createChallenge);
router.put("/:id", updateChallenge);
router.patch("/:id", updateChallenge);
router.delete("/:id", deleteChallenge);

module.exports = router;
