const mongoose = require("mongoose");

const db = async () => {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not set");
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = db;