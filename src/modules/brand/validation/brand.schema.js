import Joi from "joi"

export const BrandSchema = Joi.object({
    name: Joi.string().required().min(5).max(64),
    isPublic: Joi.boolean().required()
})

export const BrandGetByIdSchema = Joi.object({
    id: Joi.number().required()
})