import {ResData} from "../../common/resData.js";
import {BrandGetByIdSchema, BrandSchema} from "./validation/brand.schema.js";
import {BrandBadRequestException} from "./exception/brand.exception.js";

export class BrandController {
    #brandService
    constructor(service) {
        this.#brandService = service
    }

    async insert(req, res) {
        try {
            const dto = req.body
            const validatedDto = BrandSchema.validate(dto)
            if (validatedDto.error) {
                throw new BrandBadRequestException(validatedDto.error.message)
            }

            const resData = await this.#brandService.insert(dto)
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
            const resData = await this.#brandService.getAll()
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
            const validatedDto = BrandGetByIdSchema.validate(dto)
            if (validatedDto.error) {
                throw new BrandBadRequestException(validatedDto.error.message)
            }
            const resData = await this.#brandService.getById(req.params.id)
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
            const validatedDtoId = BrandGetByIdSchema.validate(req.params)
            if (validatedDtoId.error) {
                throw new BrandBadRequestException(validatedDtoId.error.message)
            }
            const validatedDto = BrandSchema.validate(req.body)
            if (validatedDto.error) {
                throw new BrandBadRequestException(validatedDto.error.message)
            }

            const resData = await this.#brandService.update(req.params.id, req.body)
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
            const validatedDto = BrandGetByIdSchema.validate(req.params)
            if(validatedDto.error) {
                throw new BrandBadRequestException(validatedDto.error.message)
            }
            const resData = await this.#brandService.delete(req.params.id)
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