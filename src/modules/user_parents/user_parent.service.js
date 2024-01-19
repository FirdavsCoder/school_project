import {ResData} from "../../common/resData.js";
import {UserParentNotFoundException} from "./exception/user_parent.exception.js";
import {UserParentRepository} from "./user_parent.repository.js";
import {UserParentEntity} from "./entity/user_parent.entity.js";



export class UserParentService {
	#repository;
	constructor() {
		this.#repository = new UserParentRepository()
	}

	async insert(dto) {
		const newUserParent = new UserParentEntity(dto)
		const addedNewUserParent = await this.#repository.insert(newUserParent)
		return new ResData(
			"Successfully added",
			201,
			addedNewUserParent
		)
	}
	async getAll() {
		const allUserParents = await this.#repository.getAll()
		return new ResData(
			"All UserParents",
			200,
			allUserParents
		)
	}

	async getById(id) {
		const foundUserParent = await this.#repository.getById(id)
		if (!foundUserParent) {
			throw new UserParentNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundUserParent
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateUserParent = new UserParentEntity(dto)
		updateUserParent.id = id
		const updatedUserParent = await this.#repository.update(updateUserParent)
		return new ResData(
			"Successfully updated",
			200,
			updatedUserParent
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedUserParent = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedUserParent
		)
	}
}
