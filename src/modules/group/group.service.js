import {ResData} from "../../common/resData.js";
import {GroupEntity} from "./entity/group.entity.js";
import {GroupRepository} from "./group.repository.js";
import {GroupNotFoundException} from "./exception/group.exception.js";

export class GroupService {
	#repository;
	constructor() {
		this.#repository = new GroupRepository()
	}

	async getAll() {
		const allGroups = await this.#repository.getAll()
		return new ResData(
			"All Groups",
			200,
			allGroups
		)
	}


	async getById(id) {
		const foundGroup = await this.#repository.getById(id)
		if (!foundGroup) {
			throw new GroupNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundGroup
		)
	}

	async insert(dto) {
		const newGroup = new GroupEntity(dto)
		const addedNewGroup = await this.#repository.insert(newGroup)
		return new ResData(
			"Successfully added",
			201,
			addedNewGroup
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateGroup = new GroupEntity(dto)
		updateGroup.id = id
		const updatedGroup = await this.#repository.update(updateGroup)
		return new ResData(
			"Successfully updated",
			200,
			updatedGroup
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedGroup = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedGroup
		)
	}
}