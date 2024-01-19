import {Postgres} from "../../lib/pg.js";

export class RoomRepository extends Postgres {
	async getAll() {
		return await this.fetchAll("SELECT * FROM rooms")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM rooms WHERE id = $1", id)
	}

	async insert(dto) {
		return await this.fetch("INSERT INTO rooms(number, name, floor, capacity, school_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
			dto.number, dto.name, dto.floor, dto.capacity, dto.school_id)
	}

	async update(dto) {
		const sql = `UPDATE rooms SET name = $2, capacity = $3 WHERE id = $1 RETURNING * `
		return await this.fetch(sql, dto.id, dto.name, dto.capacity)
	}

	async delete(id) {
		const sql = "DELETE FROM rooms WHERE id = $1 RETURNING * "
		return await this.fetch(sql, id)
	}
}