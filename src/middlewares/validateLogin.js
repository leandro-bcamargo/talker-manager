const { HTTP_CLIENT_ERROR } = require("../helpers/httpStatus");
const CustomError = require("./customError");

function validateEmail(email) {
  if (!email)
    throw new CustomError(HTTP_CLIENT_ERROR, 'O campo "email" é obrigatório');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email))
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O "email" deve ter o formato "email@email.com"'
    );
}

function validatePassword(password) {
  if (!password)
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O campo "password" é obrigatório'
    );
  if (password.length < 6)
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O "password" deve ter pelo menos 6 caracteres'
    );
}

function validateLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    validateEmail(email);
    validatePassword(password);
  } catch (error) {
    return next(error);
  }

  return next();
}

module.exports = {
  validateLogin,
};
