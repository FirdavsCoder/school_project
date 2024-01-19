import {ResData} from "../../common/resData.js";
import {SchoolGetByIdSchema, SchoolSchema, SchoolUpdateSchema} from "./validation/school.schema.js";
import {SchoolBadRequestException} from "./exception/school.exception.js";


export class SchoolController {
    #schoolService;
    constructor(service) {
        this.#schoolService = service
    }

    async insert(req, res) {
        try {
            const dto = req.body
            const validatedDto = SchoolSchema.validate(dto)
            if (validatedDto.error) {
                throw new SchoolBadRequestException(validatedDto.error.message)
            }

            const resData = await this.#schoolService.insert(dto)
            res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(400).json(resData)

        }
    }

    async getAll(req, res) {
        try {
            const resData = await this.#schoolService.getAll()
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(400).json(resData)
        }
    }

    async getById(req, res) {
        try {
            const dto = req.params
            const validatedDto = SchoolGetByIdSchema.validate(dto)
            if (validatedDto.error) {
                throw new SchoolBadRequestException(validatedDto.error.message)
            }
            const resData = await this.#schoolService.getById(req.params.id)
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(400).json(resData)
        }
    }

    async update(req, res) {
        try {
            const validatedDtoId = SchoolGetByIdSchema.validate(req.params)
            if (validatedDtoId.error) {
                throw new SchoolBadRequestException(validatedDtoId.error.message)
            }
            const validatedDto = SchoolUpdateSchema.validate(req.body)
            if (validatedDto.error) {
                throw new SchoolBadRequestException(validatedDto.error.message)
            }

            const resData = await this.#schoolService.update(req.params.id, req.body)
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(400).json(resData)
        }
    }

    async delete(req, res) {
        try {
            const validatedDto = SchoolGetByIdSchema.validate(req.params)
            if(validatedDto.error) {
                throw new SchoolBadRequestException(validatedDto.error.message)
            }
            const resData = await this.#schoolService.delete(req.params.id)
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(400).json(resData)
        }
    }
}


