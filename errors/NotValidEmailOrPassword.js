const { ERROR_CODE_401 } = require('./errorCodes');

class NotValidEmailOrPassword extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = NotValidEmailOrPassword;
