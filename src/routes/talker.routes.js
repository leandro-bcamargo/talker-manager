const express = require("express");
const talker = express.Router();
const talkerDB = require("../db/talkerDB");
const {
  HTTP_NOT_FOUND,
  HTTP_OK_STATUS,
  HTTP_SERVER_ERROR,
  HTTP_CREATED,
  HTTP_DELETED,
} = require("../helpers/httpStatus");
const {
  validateDelete,
  validatePostPut,
  validateGetSearch,
} = require("../middlewares/validateTalker");

talker.get("/", async (req, res) => {
  try {
    const result = await talkerDB.getAll();
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ message: error.message });
  }
});

talker.get("/search", validateGetSearch, async (req, res, next) => {
  try {
    const { q, rate } = req.query;
    if (rate) {
      const talkers = await talkerDB.getByRate(Number(rate), q);

      return res.status(HTTP_OK_STATUS).json(talkers);
    }
    const talkers = await talkerDB.getBySearch(q);

    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    next(error);
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
    return res.status(HTTP_DELETED).end();
  } catch (error) {
    next(error);
  }
});

module.exports = talker;
