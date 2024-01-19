import Joi from "joi";

export const RoomSchema = Joi.object({
	number: Joi.number().required(),
	name: Joi.string().required(),
	floor: Joi.number().required(),
	capacity: Joi.number().required(),
	schoolId: Joi.number().required()
})


export const RoomUpdateSchema = Joi.object({
	name: Joi.string().required(),
	capacity: Joi.number().required()
})

export const RoomGetByIdSchema = Joi.object({
	id: Joi.number().required()
})