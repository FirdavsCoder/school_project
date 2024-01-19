import {Postgres} from "../../lib/pg.js";

export class SubjectRepository extends Postgres {
	async getAll() {
		return await this.fetchAll("SELECT * FROM subjects")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM subjects WHERE id = $1", id)
	}

	async insert(dto) {
		return await this.fetch("INSERT INTO subjects(name, brand_id) VALUES($1, $2) RETURNING *",
			dto.name, dto.brand_id)
	}

	async update(dto) {
		const sql = `UPDATE subjects SET name = $2 WHERE id = $1 RETURNING * `
		return await this.fetch(sql, dto.id, dto.name)
	}

	async delete(id) {
		const sql = "DELETE FROM subjects WHERE id = $1 RETURNING * "
		return await this.fetch(sql, id)
	}
}