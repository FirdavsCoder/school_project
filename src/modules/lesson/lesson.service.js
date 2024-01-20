import {ResData} from "../../common/resData.js";
import {LessonNotFoundException} from "./exception/lesson.exception.js";
import {LessonRepository} from "./lesson.repository.js";
import {LessonEntity} from "./entity/lesson.entity.js";


export class LessonService {
	#repository;
	constructor() {
		this.#repository = new LessonRepository()
	}

	async getAll() {
		const allLessons = await this.#repository.getAll()
		return new ResData(
			"All Lessons",
			200,
			allLessons
		)
	}

	async getById(id) {
		const foundLesson = await this.#repository.getById(id)
		if (!foundLesson) {
			throw new LessonNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundLesson
		)
	}

	async insert(dto) {
		const newLesson = new LessonEntity(dto)
		console.log(newLesson)
		const addedNewLesson = await this.#repository.insert(newLesson)
		return new ResData(
			"Successfully added",
			201,
			addedNewLesson
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateLesson = new LessonEntity(dto)
		updateLesson.id = id
		const updatedLesson = await this.#repository.update(updateLesson)
		return new ResData(
			"Successfully updated",
			200,
			updatedLesson
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedLesson = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedLesson
		)
	}
}