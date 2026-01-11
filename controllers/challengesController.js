const { randomUUID } = require("crypto");

const {
  getAllChallenges,
  getChallengeById,
  insertChallenge,
  deleteChallengeById,
  updateChallenge: updateChallengeInDb,
} = require("../db/challengesModel");

const { validateChallenge } = require("../utils/validation");

const getChallenges = async (req, res, next) => {
  try {
    const { filter, limit, sort } = req.query;
    let rows = await getAllChallenges();

    // Filter by difficulty
    if (filter) {
      rows = rows.filter(
        (row) => row.difficulty.toLowerCase() === filter.toLowerCase()
      );
    }

    // Sort: createdAt, title, difficulty (prepend - for descending)
    if (sort) {
      const isDescending = sort.startsWith("-");
      const sortField = isDescending ? sort.slice(1) : sort;

      rows.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return isDescending ? 1 : -1;
        if (aValue > bValue) return isDescending ? -1 : 1;
        return 0;
      });
    }

    // Limit results
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (parsedLimit > 0) {
        rows = rows.slice(0, parsedLimit);
      }
    }

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

  const validation = validateChallenge({ title, difficulty });
  if (!validation.valid) {
    const err = new Error(validation.errors.join("; "));
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

const deleteChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteChallengeById(id);

    if (deleted === 0) {
      const err = new Error("Challenge not found");
      err.statusCode = 404;
      return next(err);
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const updateChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, difficulty } = req.body;

    // Check if challenge exists
    const challenge = await getChallengeById(id);
    if (!challenge) {
      const err = new Error("Challenge not found");
      err.statusCode = 404;
      return next(err);
    }

    // Validate provided fields (partial update)
    const validation = validateChallenge({ title, difficulty }, true);
    if (!validation.valid) {
      const err = new Error(validation.errors.join("; "));
      err.statusCode = 400;
      return next(err);
    }

    // Prepare update object with trimmed values
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (difficulty !== undefined) updates.difficulty = difficulty.trim();

    const updated = await updateChallengeInDb(id, updates);

    if (updated === 0) {
      const err = new Error("Failed to update challenge");
      err.statusCode = 500;
      return next(err);
    }

    // Fetch and return updated challenge
    const updatedChallenge = await getChallengeById(id);
    res.status(200).json(updatedChallenge);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  createChallenge,
  deleteChallenge,
  updateChallenge,
};
