const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({ message: 'Datos no válidos' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Datos no válidos' });
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Datos no válidos' });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .send({ message: 'El correo electrónico ya está en uso' });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Error interno del servidor' : message,
  });
};

module.exports = errorHandler;
