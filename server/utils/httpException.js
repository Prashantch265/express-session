class HttpException extends Error {
  constructor(status, message, description = null, source = null) {
    super();
    this.message = message;
    this.status = status;
    this.description = description;
    this.source = source;
  }
}

module.exports = HttpException;
