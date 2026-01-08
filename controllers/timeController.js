const getTime = (req, res) => {
  res.status(200).json({ now: new Date().toISOString() });
};

const echoMessage = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    const err = new Error(
      "message is required and must be a non-empty string"
    );
    err.statusCode = 400;
    return next(err);
  }

  return res.status(201).json({ received: message.trim() });
};

module.exports = { getTime, echoMessage };
