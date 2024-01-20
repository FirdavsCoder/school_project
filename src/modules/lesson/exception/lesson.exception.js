export class LessonException extends Error{
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}


export class LessonNotFoundException extends Error {
	constructor() {
		super("Lesson Not Found");
	}
}

