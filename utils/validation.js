const validateTitle = (title) => {
  if (!title) {
    return { valid: false, error: "Title is required" };
  }
  if (typeof title !== "string") {
    return { valid: false, error: "Title must be a string" };
  }
  if (title.trim().length === 0) {
    return { valid: false, error: "Title cannot be empty" };
  }
  return { valid: true };
};

const validateDifficulty = (difficulty) => {
  if (difficulty === undefined || difficulty === null) {
    return { valid: true };
  }
  if (typeof difficulty !== "string") {
    return { valid: false, error: "Difficulty must be a string" };
  }
  if (difficulty.trim().length === 0) {
    return { valid: false, error: "Difficulty cannot be empty" };
  }
  return { valid: true };
};

const validateChallenge = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.title !== undefined) {
    const titleValidation = validateTitle(data.title);
    if (!titleValidation.valid) {
      errors.push(titleValidation.error);
    }
  }

  if (data.difficulty !== undefined) {
    const difficultyValidation = validateDifficulty(data.difficulty);
    if (!difficultyValidation.valid) {
      errors.push(difficultyValidation.error);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateTitle,
  validateDifficulty,
  validateChallenge,
};
