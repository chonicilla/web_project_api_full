const jwt = require('jsonwebtoken');
const createError = require('../utils/errors');

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(createError(401, 'Se requiere autorización'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(createError(401, 'Se requiere autorización'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
