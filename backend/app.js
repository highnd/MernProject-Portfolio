require("dotenv").config();
require("./db");
require("express-async-errors");
const userRouter = require("./routes/user");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/*", handleNotFound);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(8000, () => {
  console.log("port is listening on port 8000");
});
