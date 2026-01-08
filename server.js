const express = require("express");

const healthRouter = require("./routes/health");
const timeRouter = require("./routes/time");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

// Middleware: log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware: parse incoming JSON bodies
app.use(express.json());

app.use("/health", healthRouter);
app.use("/time", timeRouter);

// Catch-all: unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
