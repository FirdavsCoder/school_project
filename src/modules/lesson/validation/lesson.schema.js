import Joi from "joi";

export const LessonSchema = Joi.object({
	teacherId: Joi.number().required(),
	subjectId: Joi.number().required(),
	groupId: Joi.number().required(),
	roomId: Joi.number().required(),
	startTime: Joi.date().required(),
	endTime: Joi.date().required(),
	startedTime: Joi.date().required(),
	endedTime: Joi.date().required()
})


export const LessonGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


export const LessonUpdateSchema = Joi.object({
	teacherId: Joi.number().required(),
	subjectId: Joi.number().required()
})

