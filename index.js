const express = require("express");

const app = express();
const PORT = 3000;

// simple route
app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
