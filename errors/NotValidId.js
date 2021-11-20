const { ERROR_CODE_404 } = require('./errorCodes');

class NotValidId extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_404;
  }
}

module.exports = NotValidId;
