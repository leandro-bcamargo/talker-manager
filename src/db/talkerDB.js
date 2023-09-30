// const connection = require("./connection");
const { readFile, writeFile } = require("../helpers/fsUtils");
const CustomError = require("../middlewares/customError");
const { HTTP_NOT_FOUND } = require("../helpers/httpStatus");

const getAll = async () => {
  const talkers = await readFile();

  return talkers;
};

const getById = async (id) => {
  const talkers = await readFile();
  const talker = talkers.find((talker) => talker.id === id);

  return talker;
};

const insert = async (newTalkerData) => {
  const talkers = await readFile();
  const insertId = talkers.length + 1;
  const newTalker = { id: insertId, ...newTalkerData };
  const newTalkers = [...talkers, newTalker];
  await writeFile(newTalkers);

  return newTalker;
};

const update = async (id, updateData, next) => {
  const talkers = await readFile();
  const talkerToUpdate = talkers.find((talker) => talker.id === id);
  if (!talkerToUpdate)
    throw new CustomError(HTTP_NOT_FOUND, "Pessoa palestrante não encontrada");
  const updatedTalkers = talkers.map((talker) => {
    if (talker.id === id)
      return {
        ...talker,
        ...updateData,
      };
    return talker;
  });
  const updatedTalker = updatedTalkers.find((talker) => talker.id === id);
  await writeFile(updatedTalkers);

  return updatedTalker;
};

const remove = async (id) => {
  const talkers = await readFile();
  const updatedTalkers = talkers.filter((talker) => talker.id !== id);

  await writeFile(updatedTalkers);
};

const getTalkers = async (searchTerm, rate, date) => {
  const talkers = await readFile();
  const selectedTalkers = talkers.filter(
    (talker) =>
      (!searchTerm || talker.name.includes(searchTerm)) &&
      (!rate || talker.talk.rate === rate) &&
      (!date || talker.talk.watchedAt === date)
  );

  return selectedTalkers;
};

const updateRate = async (id, rate) => {
  const talkers = await readFile();
  const updatedTalkers = talkers.map((talker) => {
    if (talker.id === id) {
      talker.talk.rate = rate;
    }
    return talker;
  });

  await writeFile(updatedTalkers);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
  getTalkers,
  updateRate,
};
