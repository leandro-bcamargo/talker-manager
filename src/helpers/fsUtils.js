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

const writeFile = async (dataToWrite) => {
  try {
    const dataStr = JSON.stringify(dataToWrite);
    await fs.writeFile(path.resolve(__dirname, FILE_PATH), dataStr);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  readFile,
  writeFile,
};
