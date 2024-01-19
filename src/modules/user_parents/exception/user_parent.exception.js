export class UserParentException extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}


export class UserParentNotFoundException extends Error {
	constructor() {
		super("User Parent Not Found");
		this.statusCode = 404
	}
}

