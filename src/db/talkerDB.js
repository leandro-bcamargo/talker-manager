const connection = require("./connection");
const { readFile } = require("../helpers/fsUtils");

const getAll = async () => {
  const talkers = await readFile();

  return talkers;
};

const getById = async (id) => {
  const talkers = await readFile();
  const talker = talkers.find((talker) => talker.id === id);

  return talker;
};

module.exports = {
  getAll,
  getById,
};
