import {ResData} from "../../common/resData.js";
import {RoomEntity} from "./entity/room.entity.js";
import {RoomNotFoundException} from "./exception/room.exception.js";
import {RoomRepository} from "./room.repository.js";
import {BrandNotFoundException} from "../brand/exception/brand.exception.js";
import {BrandEntity} from "../brand/entity/brand.entity.js";

export class RoomService {
	#repository;
	constructor() {
		this.#repository = new RoomRepository()
	}

	async getAll() {
		const allRooms = await this.#repository.getAll()
		return new ResData(
			"All Rooms",
			200,
			allRooms
		)
	}

	async getById(id) {
		const foundRoom = await this.#repository.getById(id)
		if (!foundRoom) {
			throw new RoomNotFoundException()
		}
		return new ResData(
			"Successfully found",
			200,
			foundRoom
		)
	}

	async insert(dto) {
		const newRoom = new RoomEntity(dto)
		const addedNewRoom = await this.#repository.insert(newRoom)
		return new ResData(
			"Successfully added",
			201,
			addedNewRoom
		)
	}

	async update(id, dto) {
		await this.getById(id)
		const updateRoom = new RoomEntity(dto)
		updateRoom.id = id
		const updatedRoom = await this.#repository.update(updateRoom)
		return new ResData(
			"Successfully updated",
			200,
			updatedRoom
		)
	}

	async delete(id) {
		await this.getById(id)
		const deletedRoom = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedRoom
		)
	}
}