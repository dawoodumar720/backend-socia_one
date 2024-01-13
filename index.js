const express = require("express");
require("dotenv").config({ path: "./env" });
const cors = require("cors");
const winston = require("./app/config/winston");
const { clearLogs } = require("./app/utils/helper");
const { connectDb } = require("./app/config/mongo");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8001;

// Setup middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Global settings
const global = {};
global.config = { ...process.env };
global.config.NODE_ENV = process.env.NODE_ENV || "development";
winston.info(`Running on environment: ${global.config.NODE_ENV}`);
if (global.config.NODE_ENV === "development") {
  clearLogs();
}

// Db config
connectDb()
  .then(() => {
    // server listening
    app.listen(PORT, () => {
      winston.info(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    winston.error(`MongoDb connection failed ${err}`);
  });
