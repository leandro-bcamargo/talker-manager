const express = require("express");
const talker = express.Router();
const talkerDB = require("../db/talkerDB");
const {
  HTTP_NOT_FOUND,
  HTTP_OK_STATUS,
  HTTP_SERVER_ERROR,
  HTTP_CREATED,
} = require("../helpers/httpStatus");
const validateTalker = require("../middlewares/validateTalker");

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

talker.post("/", validateTalker, async (req, res) => {
  const talker = await talkerDB.insert(req.body);
  return res.status(HTTP_CREATED).json(talker);
});

talker.put("/:id", validateTalker, async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateData = req.body;
    const talker = await talkerDB.update(Number(id), updateData, next);

    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    next(error);
  }
});

module.exports = talker;
