import {Postgres} from "../../lib/pg.js";

export class UserParentRepository extends Postgres {
	async getAll() {
		// const sql = `
		// SELECT row_to_json(u) AS child, row_to_json(p) AS parent
		// FROM user_parents up
        //  INNER JOIN users u on u.id = up.child_id
        //  INNER JOIN users p on p.id = up.parent_id
		// `

		const sql = `
		SELECT *
		FROM user_parents
		`
		return await this.fetchAll(sql)
	}

	async getById(id) {
		const sql = `
		SELECT *
		FROM user_parents WHERE id = $1
		`
		return await this.fetch(sql, id)
	}

	async insert(dto) {
		return await this.fetch(
			"INSERT INTO user_parents(child_id, parent_id) VALUES($1, $2) RETURNING *",
			dto.child_id, dto.parent_id
		)
	}

	async update(dto) {
		return await this.fetch("UPDATE user_parents SET child_id=$2, parent_id=$3 WHERE id = $1 RETURNING *",
			dto.id, dto.child_id, dto.parent_id)
	}

	async delete(id) {
		return await this.fetch("DELETE FROM user_parents WHERE id = $1 RETURNING * ", id)
	}
}