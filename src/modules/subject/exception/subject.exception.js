export class SubjectException extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}

export class SubjectNotFoundException extends Error {
	constructor() {
		super("Subject Not Found");
		this.statusCode = 404
	}
}

