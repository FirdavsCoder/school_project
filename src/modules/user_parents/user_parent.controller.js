import {ResData} from "../../common/resData.js";
import {UserParentGetById, UserParentSchema} from "./validation/user_parent.schema.js";
import {UserParentException} from "./exception/user_parent.exception.js";

export class UserParentController {
	#service;
	constructor(service) {
		this.#service = service
	}

	async insert(req, res) {
		try {
			const dto = req.body
			const validatedDto = UserParentSchema.validate(dto)
			if (validatedDto.error) {
				throw new UserParentException(validatedDto.error.message)
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
			const validatedDto = UserParentGetById.validate(dto)
			if (validatedDto.error) {
				throw new UserParentException(validatedDto.error.message)
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
			const validatedDtoId = UserParentGetById.validate(req.params)
			if (validatedDtoId.error) {
				throw new UserParentException(validatedDtoId.error.message)
			}
			const validatedDto = UserParentSchema.validate(req.body)
			if (validatedDto.error) {
				throw new UserParentException(validatedDto.error.message)
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
			const validatedDto = UserParentGetById.validate(req.params)
			if(validatedDto.error) {
				throw new UserParentException(validatedDto.error.message)
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