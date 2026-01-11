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

module.exports = {
  getAllChallenges,
  getChallengeById,
  insertChallenge,
  deleteChallengeById,
};
