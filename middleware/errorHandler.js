const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Default to 500 unless we set a status on the error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
