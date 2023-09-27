const express = require("express");
const talker = express.Router();
const talkerDB = require("../db/talkerDB");
const {
  HTTP_NOT_FOUND,
  HTTP_OK_STATUS,
  HTTP_SERVER_ERROR,
} = require("../helpers/httpStatus");

talker.get("/", async (req, res) => {
  try {
    const result = await talkerDB.getAll();
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ message: error.message });
  }
});

talker.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await talkerDB.getById(Number(id));
    if (!result)
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "Pessoa palestrante não encontrada" });
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = talker;
