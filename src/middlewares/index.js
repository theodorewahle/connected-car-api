import logger from 'utils/logging'

export const errorMiddleware = (err, req, res, next) => {
  if (err) {
    const { name, status, message } = err;
    logger.error(err)
    const errObject = { message, status: 'error' }
    errObject.type = name === 'Error' ? 'ServerError' : name
    res.status(status || 500).send(errObject);
  }
};
