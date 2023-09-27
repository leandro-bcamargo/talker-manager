const express = require("express");
const generateToken = require("../helpers/generateToken");
const {} = require("../helpers/httpStatus");
const { validateLogin } = require("../middlewares/validateLogin");

const login = express.Router();

login.post("/", validateLogin, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = login;
