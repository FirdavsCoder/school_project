export class SchoolBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}

export class SchoolNotFoundException extends Error {
    constructor() {
        super("School Not Found");
        this.statusCode = 404
    }
}


