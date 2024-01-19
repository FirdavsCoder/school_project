import {Postgres} from "../../lib/pg.js";

export class SchoolRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            `INSERT INTO schools(name, address, latitude, longitude, phone, brand_id)
                  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            dto.name, dto.address, dto.latitude, dto.longitude, dto.phone, dto.brand_id
        )
    }

    async getAll() {
        return await this.fetchAll('SELECT * FROM schools')
    }

    async getById(id) {
        return await this.fetch('SELECT * FROM schools WHERE id=$1', id)
    }

    async update(dto) {
        return await this.fetch(
            `UPDATE schools SET name=$2, address=$3, latitude=$4, longitude=$5, phone=$6 WHERE id = $1 RETURNING * `,
            dto.id, dto.name, dto.address, dto.latitude, dto.longitude, dto.phone
        )
    }

    async delete(id) {
        return await this.fetch(
            `DELETE FROM schools WHERE id=$1 RETURNING * `,
            id
        )
    }
}