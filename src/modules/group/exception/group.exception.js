export class GroupException extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}

export class GroupNotFoundException extends Error {
	constructor() {
		super("Group Not Found");
		this.statusCode = 404
	}
}

