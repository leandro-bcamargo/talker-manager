const express = require("express");
const generateToken = require("../helpers/generateToken");
const { HTTP_OK_STATUS } = require("../helpers/httpStatus");
const { validateLogin } = require("../middlewares/validateLogin");

const login = express.Router();

login.post("/", validateLogin, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = login;
