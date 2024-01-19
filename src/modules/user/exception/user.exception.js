export class UserNotFoundException extends Error {
  constructor() {
    super("user not found");

    this.statusCode = 404;
  }
}

export class UserBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

