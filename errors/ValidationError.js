const { ERROR_CODE_400 } = require('./errorCodes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_400;
  }
}

module.exports = ValidationError;
