import {ResData} from "../../common/resData.js";
import {SubjectEntity} from "./entity/subject.entity.js";
import {SubjectRepository} from "./subject.repository.js";
import {SubjectNotFoundException} from "./exception/subject.exception.js";

export class SubjectService {
	#repository;
	constructor() {
		this.#repository = new SubjectRepository()
	}

	async getAll() {
		const allSubjects = await this.#repository.getAll()
		return new ResData(
			"All Subjects",
			200,
			allSubjects
		)
	}


	async getById(id) {
		const foundSubject = await this.#repository.getById(id)
		if (!foundSubject) {
			throw new SubjectNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundSubject
		)
	}

	async insert(dto) {
		const newSubject = new SubjectEntity(dto)
		const addedNewSubject = await this.#repository.insert(newSubject)
		return new ResData(
			"Successfully added",
			201,
			addedNewSubject
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateSubject = new SubjectEntity(dto)
		updateSubject.id = id
		const updatedSubject = await this.#repository.update(updateSubject)
		return new ResData(
			"Successfully updated",
			200,
			updatedSubject
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedSubject = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedSubject
		)
	}
}