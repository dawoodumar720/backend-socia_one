const fs = require("fs");
const path = require("path");
const winston = require("../config/winston");
const dirPath = path.join(__dirname, "../../logs");

function clearLogs() {
  try {
    winston.info(`Clearing logs: ${dirPath}`);
    fs.rmSync(dirPath, { recursive: true });
  } catch (err) {
    winston.error(`Error: ${err}`);
  } finally {
    fs.mkdirSync(dirPath);
  }
}

module.exports = { clearLogs };
