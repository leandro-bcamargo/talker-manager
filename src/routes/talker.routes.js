const express = require("express");
const talker = express.Router();
const talkerDB = require("../db/talkerDB");

const HTTP_OK_STATUS = 200;
const HTTP_SERVER_ERROR = 500;

talker.get("/", async (req, res) => {
  try {
    const result = await talkerDB.getAll();
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = talker;
