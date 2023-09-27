const express = require("express");
const generateToken = require("../helpers/generateToken");
const {} = require("../helpers/httpStatus");

const login = express.Router();

login.post("/", (req, res) => {
  try {
    const { email, password } = req.body;
    const token = generateToken();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = login;
