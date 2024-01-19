import {ResData} from "../../common/resData.js";
import {SubjectGetByIdSchema, SubjectSchema, SubjectUpdateSchema} from "./validation/subject.schema.js";
import {SubjectException} from "./exception/subject.exception.js";
import {RoomGetByIdSchema,  RoomUpdateSchema} from "../room/validation/room.schema.js";



export class SubjectController {
	#service;
	constructor(service) {
		this.#service = service
	}

	async insert(req, res) {
		try {
			const dto = req.body
			const validatedDto = SubjectSchema.validate(dto)
			if (validatedDto.error) {
				throw new SubjectException(validatedDto.error.message)
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
			const validatedDto = SubjectGetByIdSchema.validate(dto)
			if (validatedDto.error) {
				throw new SubjectException(validatedDto.error.message)
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
			const validatedDtoId = SubjectGetByIdSchema.validate(req.params)
			if (validatedDtoId.error) {
				throw new SubjectException(validatedDtoId.error.message)
			}
			const validatedDto = SubjectUpdateSchema.validate(req.body)
			if (validatedDto.error) {
				throw new SubjectException(validatedDto.error.message)
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
			const validatedDto = SubjectGetByIdSchema.validate(req.params)
			if(validatedDto.error) {
				throw new SubjectException(validatedDto.error.message)
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