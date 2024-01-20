import {Postgres} from "../../lib/pg.js";

export class GroupRepository extends Postgres {
	async getAll() {
		return await this.fetchAll("SELECT * FROM groups")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM groups WHERE id = $1", id)
	}

	async insert(dto) {
		return await this.fetch("INSERT INTO groups(name, brand_id, head_teacher_id, room_id) VALUES($1, $2, $3, $4) RETURNING *",
			dto.name, dto.brand_id, dto.head_teacher_id, dto.room_id)
	}

	async update(dto) {
		const sql = `UPDATE lessons SET name = $2 WHERE id = $1 RETURNING * `
		return await this.fetch(sql, dto.id, dto.name)
	}

	async delete(id) {
		const sql = "DELETE FROM groups WHERE id = $1 RETURNING * "
		return await this.fetch(sql, id)
	}
}


