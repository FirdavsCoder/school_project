import {Postgres} from "../../lib/pg.js";

export class TeacherSubjectRepository extends Postgres{
	async getAll() {
		return await this.fetchAll("SELECT * FROM teacher_subjects")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM teacher_subjects WHERE id = $1", id)
	}

	async insert(dto) {
		return await this.fetch("INSERT INTO teacher_subjects(teacher_id, subject_id) VALUES($1, $2) RETURNING *",
			dto.teacher_id, dto.subject_id)
	}

	async update(dto) {
		const sql = `UPDATE teacher_subjects SET teacher_id = $2, subject_id = $3 WHERE id = $1 RETURNING * `
		return await this.fetch(sql, dto.id, dto.teacher_id, dto.subject_id)
	}

	async delete(id) {
		const sql = "DELETE FROM teacher_subjects WHERE id = $1 RETURNING * "
		return await this.fetch(sql, id)
	}
}