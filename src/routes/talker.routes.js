const express = require("express");
const talker = express.Router();
const talkerDB = require("../db/talkerDB");
const {
  HTTP_NOT_FOUND,
  HTTP_OK_STATUS,
  HTTP_SERVER_ERROR,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
} = require("../helpers/httpStatus");
const {
  validateDelete,
  validatePostPut,
  validateGetSearch,
  validatePatch,
} = require("../middlewares/validateTalker");
const CustomError = require("../middlewares/customError");

talker.get("/", async (req, res) => {
  try {
    const result = await talkerDB.getAll();
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ message: error.message });
  }
});

talker.get("/db", async (req, res) => {
  const talkers = await talkerDB.getTalkersDB();

  return res.status(HTTP_OK_STATUS).json(talkers);
});

talker.get("/search", validateGetSearch, async (req, res, next) => {
  try {
    const { q, rate, date } = req.query;
    const talkers = await talkerDB.getTalkers(q, Number(rate), date);

    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    next(error);
  }
});

talker.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await talkerDB.getById(Number(id));
    if (!result)
      throw new CustomError(
        HTTP_NOT_FOUND,
        "Pessoa palestrante não encontrada"
      );
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    next(error);
  }
});

talker.post("/", validatePostPut, async (req, res) => {
  const talker = await talkerDB.insert(req.body);
  return res.status(HTTP_CREATED).json(talker);
});

talker.put("/:id", validatePostPut, async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateData = req.body;
    const talker = await talkerDB.update(Number(id), updateData, next);

    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    next(error);
  }
});

talker.delete("/:id", validateDelete, async (req, res, next) => {
  try {
    const { id } = req.params;
    await talkerDB.remove(Number(id));
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
});

talker.patch("/rate/:id", validatePatch, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    await talkerDB.updateRate(Number(id), Number(rate));
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
});

module.exports = talker;
