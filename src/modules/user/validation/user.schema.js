import Joi from "joi";
import {roles1, sex1} from "../../../common/enums/roles.js"

export const UserCreateSchema = Joi.object({
    login: Joi.string().required().min(3).max(64),
    password: Joi.string().required(),
    role: Joi.string().valid(...roles1).required(),
    sex: Joi.string().valid(...sex1).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(5).max(128).optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    phone: Joi.array().optional(),
    groupId: Joi.number().optional(),
    brandId: Joi.number().required()
})

export const UserLoginSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
})


export const UpdateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
})


export const UserGetByIdSchema = Joi.object({
    id: Joi.number().required()
})