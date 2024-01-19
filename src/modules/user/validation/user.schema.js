import Joi from "joi";
import {roles, sex} from "../../../common/enums/roles.js"

export const UserCreateSchema = Joi.object({
    login: Joi.string().required().min(3).max(64),
    password: Joi.string().required(),
    role: Joi.string().valid(...roles).required(),
    sex: Joi.string().valid(...sex).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(5).max(128).optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    phone: Joi.array().optional(),
    groupId: Joi.number().optional(),
    brandId: Joi.number().required()
})