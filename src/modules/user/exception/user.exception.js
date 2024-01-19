export class UserNotFoundException extends Error {
  constructor() {
    super("User Not Found");
    this.statusCode = 404;
  }
}

export class UserBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

