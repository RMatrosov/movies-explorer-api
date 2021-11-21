const jwt = require('jsonwebtoken');
const NotValidEmailOrPassword = require('../errors/NotValidEmailOrPassword');
const { JWT_SECRET } = require('../config');

const handleAuthError = () => {
  throw new NotValidEmailOrPassword('произошла ошибка авторизации');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
