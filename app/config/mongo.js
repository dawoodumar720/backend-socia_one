const mongoose = require("mongoose");
require("dotenv").config();
const winston = require("./winston");

async function connectDb() {
  const host = `${process.env.MONGODB_URL}${process.env.DB_NAME}`;

  try {
    // Connect to MongoDB
    await mongoose.connect(host);

    winston.info("Connected to MongoDB");
    winston.info(`Host: ${host}`);
  } catch (err) {
    winston.error(`Error: ${err}`);
  }
}

module.exports = { connectDb };
