export class TeacherSubjectException extends Error{
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}

export class TeacherSubjectNotFoundException extends Error {
	constructor() {
		super("Teacher Subject Not Found");
		this.statusCode = 404
	}
}

