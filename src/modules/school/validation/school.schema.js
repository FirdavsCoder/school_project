import Joi from "joi";

export const SchoolSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().optional().min(5).max(64),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    phone: Joi.array().optional(),
    brandId: Joi.number().required()
})


export const SchoolUpdateSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().optional().min(5).max(64),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    phone: Joi.array().optional()
})


export const SchoolGetByIdSchema = Joi.object({
    id: Joi.number().required()
})

