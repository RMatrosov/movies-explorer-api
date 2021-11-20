const { ERROR_CODE_409 } = require('./errorCodes');

class MongoServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

module.exports = MongoServerError;
