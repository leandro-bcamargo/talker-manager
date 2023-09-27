const connection = require("./connection");
const { readFile } = require("./fsUtils");

const getAll = async () => {
  const result = await readFile();

  return result;
};

module.exports = {
  getAll,
};
