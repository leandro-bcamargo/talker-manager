const connection = require("./connection");
const { readFile, writeFile } = require("../helpers/fsUtils");

const getAll = async () => {
  const talkers = await readFile();

  return talkers;
};

const getById = async (id) => {
  const talkers = await readFile();
  const talker = talkers.find((talker) => talker.id === id);

  return talker;
};

const insert = async (talkerData) => {
  const newTalkers = await writeFile(talkerData);

  return newTalkers;
};

module.exports = {
  getAll,
  getById,
  insert,
};
