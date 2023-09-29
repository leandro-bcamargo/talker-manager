const {
  HTTP_UNAUTHORIZED,
  HTTP_CLIENT_ERROR,
} = require("../helpers/httpStatus");
const CustomError = require("./customError");

const validateAuthorization = (authorization) => {
  if (!authorization)
    throw new CustomError(HTTP_UNAUTHORIZED, "Token não encontrado");
  if (authorization.length !== 16)
    throw new CustomError(HTTP_UNAUTHORIZED, "Token inválido");
};

const validateName = (name) => {
  if (!name)
    throw new CustomError(HTTP_CLIENT_ERROR, 'O campo "name" é obrigatório');
  if (name.length < 3)
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O "name" deve ter pelo menos 3 caracteres'
    );
};

const validateAge = (age) => {
  if (!age)
    throw new CustomError(HTTP_CLIENT_ERROR, 'O campo "age" é obrigatório');
  if (!Number.isInteger(age) || age < 18)
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O campo "age" deve ser um número inteiro igual ou maior que 18'
    );
};

const validateWatchedAt = (watchedAt) => {
  if (!watchedAt)
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O campo "watchedAt" é obrigatório'
    );
  const dateRegex =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!dateRegex.test(watchedAt))
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
    );
};

const validateRate = (rate) => {
  if (rate === undefined)
    throw new CustomError(HTTP_CLIENT_ERROR, 'O campo "rate" é obrigatório');
  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5))
    throw new CustomError(
      HTTP_CLIENT_ERROR,
      'O campo "rate" deve ser um número inteiro entre 1 e 5'
    );
};

const validateTalk = (talk) => {
  if (!talk)
    throw new CustomError(HTTP_CLIENT_ERROR, 'O campo "talk" é obrigatório');
};

const validatePostPut = (req, res, next) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  validateTalk(talk);
  const {
    talk: { watchedAt, rate },
  } = req.body;
  validateAuthorization(authorization);
  validateName(name);
  validateAge(age);
  validateWatchedAt(watchedAt);
  validateRate(rate);

  return next();
};

const validateDelete = (req, res, next) => {
  const { authorization } = req.headers;
  validateAuthorization(authorization);

  return next();
};

const validateGetSearch = (req, res, next) => {
  const { authorization } = req.headers;
  validateAuthorization(authorization);

  return next();
};

module.exports = { validatePostPut, validateDelete, validateGetSearch };
