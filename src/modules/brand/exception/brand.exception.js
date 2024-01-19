export class BrandNotFoundException extends Error {
    constructor() {
        super("Brand Not Found");
        this.statusCode = 404
    }
}

export class BrandBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}


