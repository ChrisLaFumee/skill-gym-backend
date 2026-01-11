const db = require("./db");

const getAllChallenges = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM challenges ORDER BY createdAt ASC",
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

const getChallengeById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM challenges WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row); // row will be undefined if not found
    });
  });
};

const insertChallenge = (challenge) => {
  const { id, title, difficulty, createdAt } = challenge;

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO challenges (id, title, difficulty, createdAt) VALUES (?, ?, ?, ?)",
      [id, title, difficulty, createdAt],
      (err) => {
        if (err) return reject(err);
        resolve(challenge);
      }
    );
  });
};

const deleteChallengeById = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM challenges WHERE id = ?", [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes); // number of rows deleted
    });
  });
};

const updateChallenge = (id, updates) => {
  const { title, difficulty } = updates;
  const allowedFields = [];
  const values = [];

  if (title !== undefined) {
    allowedFields.push("title = ?");
    values.push(title);
  }

  if (difficulty !== undefined) {
    allowedFields.push("difficulty = ?");
    values.push(difficulty);
  }

  if (allowedFields.length === 0) {
    return Promise.resolve(0);
  }

  values.push(id);

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE challenges SET ${allowedFields.join(", ")} WHERE id = ?`,
      values,
      function (err) {
        if (err) return reject(err);
        resolve(this.changes); // number of rows updated
      }
    );
  });
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  insertChallenge,
  deleteChallengeById,
  updateChallenge,
};
