import Joi from "joi";

export const UserParentSchema = Joi.object({
	childId: Joi.number().required(),
	parentId: Joi.number().required()
})

export const UserParentGetById = Joi.object({
	id: Joi.number().required()
})

