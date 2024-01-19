import Joi from "joi";

export const SubjectSchema = Joi.object({
	name: Joi.string().required(),
	brandId: Joi.number().required()
})

export const SubjectGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


export const SubjectUpdateSchema = Joi.object({
	name: Joi.string().required()
})
