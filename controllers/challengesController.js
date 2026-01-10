const { randomUUID } = require("crypto");

const {
  getAllChallenges,
  getChallengeById,
  insertChallenge,
} = require("../db/challengesModel");

const getChallenges = async (req, res, next) => {
  try {
    const rows = await getAllChallenges();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

const getChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const row = await getChallengeById(id);

    if (!row) {
      const err = new Error("Challenge not found");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json(row);
  } catch (err) {
    next(err);
  }
};

const createChallenge = async (req, res, next) => {
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

  try {
    const saved = await insertChallenge(newChallenge);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  createChallenge,
};
