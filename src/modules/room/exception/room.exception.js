export class RoomBadRequestException extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}

export class RoomNotFoundException extends Error {
	constructor() {
		super("Room Not Found");
		this.statusCode = 404
	}
}

