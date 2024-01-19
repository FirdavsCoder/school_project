import {ResData} from "../../common/resData.js";
import {GroupGetByIdSchema, GroupSchema, GroupUpdateSchema} from "./validation/group.schema.js";
import {GroupException} from "./exception/group.exception.js";

export class GroupController {
	#service;
	constructor(service) {
		this.#service = service
	}

	async insert(req, res) {
		try {
			const dto = req.body
			const validatedDto = GroupSchema.validate(dto)
			if (validatedDto.error) {
				throw new GroupException(validatedDto.error.message)
			}

			const resData = await this.#service.insert(dto)
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
			const resData = await this.#service.getAll()
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
			const validatedDto = GroupGetByIdSchema.validate(dto)
			if (validatedDto.error) {
				throw new GroupException(validatedDto.error.message)
			}
			const resData = await this.#service.getById(req.params.id)
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
			const validatedDtoId = GroupGetByIdSchema.validate(req.params)
			if (validatedDtoId.error) {
				throw new GroupException(validatedDtoId.error.message)
			}
			const validatedDto = GroupUpdateSchema.validate(req.body)
			if (validatedDto.error) {
				throw new GroupException(validatedDto.error.message)
			}
			const resData = await this.#service.update(req.params.id, req.body)
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
			const validatedDto = GroupGetByIdSchema.validate(req.params)
			if(validatedDto.error) {
				throw new GroupException(validatedDto.error.message)
			}
			const resData = await this.#service.delete(req.params.id)
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