import {Postgres} from "../../lib/pg.js";

export class BrandRepository extends Postgres {
    async insert(dto) {
        return await this.fetch(
            "INSERT INTO brands(name, is_public) VALUES($1, $2) RETURNING *",
            dto.name, dto.is_public
        )
    }
    async getAll() {
        return await this.fetchAll(
            "SELECT * FROM brands"
        )
    }

    async getById(id) {
        return await this.fetch(
            "SELECT * FROM brands WHERE id=$1",
            id
        )
    }

    async update(dto) {
        return await this.fetch(
            'UPDATE brands SET name=$2, is_public=$3 WHERE id=$1 RETURNING *',
            dto.id, dto.name, dto.is_public
        )
    }

    async delete(id){
        return await this.fetch('DELETE FROM brands WHERE id=$1 RETURNING *', id)
    }

}


