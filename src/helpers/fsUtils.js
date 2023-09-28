const fs = require("fs/promises");
const path = require("path");

const FILE_PATH = "../talker.json";

const readFile = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, FILE_PATH));
    const dataObj = JSON.parse(data);
    return dataObj;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const writeFile = async (talkerData) => {
  try {
    const talkers = await readFile();
    const insertId = talkers.length + 1;
    const newTalker = { id: insertId, ...talkerData };
    const newTalkers = [...talkers, newTalker];
    const newTalkersStr = JSON.stringify(newTalkers);
    await fs.writeFile(path.resolve(__dirname, FILE_PATH), newTalkersStr);

    return newTalker;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  readFile,
  writeFile,
};
