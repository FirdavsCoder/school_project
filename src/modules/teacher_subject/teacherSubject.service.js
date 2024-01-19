import {ResData} from "../../common/resData.js";
import {TeacherSubjectEntity} from "./entity/teacherSubject.entity.js";
import {TeacherSubjectRepository} from "./teacherSubject.repository.js";
import {TeacherSubjectNotFoundException} from "./exception/teacherSubject.exception.js";

export class TeacherSubjectService {
	#repository;
	constructor() {
		this.#repository = new TeacherSubjectRepository()
	}

	async getAll() {
		const allTeacherSubjects = await this.#repository.getAll()
		return new ResData(
			"All Teacher Subjects",
			200,
			allTeacherSubjects
		)
	}


	async getById(id) {
		const foundTeacherSubject = await this.#repository.getById(id)
		if (!foundTeacherSubject) {
			throw new TeacherSubjectNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundTeacherSubject
		)
	}

	async insert(dto) {
		const newTeacherSubject = new TeacherSubjectEntity(dto)
		const addedNewTeacherSubject = await this.#repository.insert(newTeacherSubject)
		return new ResData(
			"Successfully added",
			201,
			addedNewTeacherSubject
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateTeacherSubject = new TeacherSubjectEntity(dto)
		updateTeacherSubject.id = id
		const updatedTeacherSubject = await this.#repository.update(updateTeacherSubject)
		return new ResData(
			"Successfully updated",
			200,
			updatedTeacherSubject
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedTeacherSubject = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedTeacherSubject
		)
	}
}