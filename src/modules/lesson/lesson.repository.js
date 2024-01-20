import {Postgres} from "../../lib/pg.js";

export class LessonRepository extends Postgres {
	async getAll() {
		return await this.fetchAll("SELECT * FROM lessons")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM lessons WHERE id = $1", id)
	}

	async insert(dto) {
		const sql = `
		INSERT INTO lessons(teacher_id, subject_id, group_id, room_id, start_time, end_time, started_time, ended_time)
		VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
		`
		return await this.fetch(sql,
			dto.teacher_id, dto.subject_id, dto.group_id, dto.room_id, dto.start_time, dto.end_time, dto.started_time, dto.ended_time)
	}

	async update(dto) {
		const sql = `UPDATE lessons SET teacher_id = $2, subject_id = $3 WHERE id = $1 RETURNING * `
		return await this.fetch(sql, dto.id, dto.teacher_id, dto.subject_id)
	}

	async delete(id) {
		const sql = "DELETE FROM lessons WHERE id = $1 RETURNING * "
		return await this.fetch(sql, id)
	}


}