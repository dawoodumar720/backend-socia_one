const express = require("express");
require("dotenv").config();
const winston = require("./app/config/winston");
const { clearLogs } = require("./app/utils/helper");
const { connectDb } = require("./app/config/mongo");

const app = express();
const PORT = process.env.PORT || 8001;

// Global settings
const global = {};
global.config = { ...process.env };
global.config.NODE_ENV = process.env.NODE_ENV || "development";
winston.info(`Running on environment: ${global.config.NODE_ENV}`);
if (global.config.NODE_ENV === "development") {
  clearLogs();
}
winston.info("winston (logger) configuration loaded.");

// Db config
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  winston.info(`Server is running on port: ${PORT}`);
});
