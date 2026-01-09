const { randomUUID } = require("crypto");

// In-memory data store (resets when server restarts)
const challenges = [];

const getChallenges = (req, res) => {
  res.status(200).json(challenges);
};

const createChallenge = (req, res, next) => {
  const { title, difficulty } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    const err = new Error("title is required and must be a non-empty string");
    err.statusCode = 400;
    return next(err);
  }

  if (
    difficulty !== undefined &&
    (typeof difficulty !== "string" || difficulty.trim().length === 0)
  ) {
    const err = new Error("difficulty must be a non-empty string if provided");
    err.statusCode = 400;
    return next(err);
  }

  const newChallenge = {
    id: randomUUID(),
    title: title.trim(),
    difficulty: difficulty ? difficulty.trim() : "normal",
    createdAt: new Date().toISOString(),
  };

  challenges.push(newChallenge);

  res.status(201).json(newChallenge);
};

module.exports = {
  getChallenges,
  createChallenge,
};
