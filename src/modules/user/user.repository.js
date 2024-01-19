import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async findAll() {
    const sql = `
    SELECT u.*, row_to_json(b) AS brand
    FROM users u
    INNER JOIN brands b on b.id = u.brand_id
    `
    return await this.fetchAll(sql);
  }
  async findOneByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }
  async getById(id) {
    const sql = `
        SELECT u.*, row_to_json(b) AS brand
        FROM users u
        INNER JOIN brands b on b.id = u.brand_id WHERE u.id = $1
    `
    return await this.fetch(sql, id);
  }

  async insert(data) {
    const SQL = `
    INSERT INTO users(
        login, password, role,
        sex, first_name, last_name,
        address, latitude, longitude,
        phone, group_id, brand_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING * 
    `
    return await this.fetch(
        SQL,
        data.login, data.password, data.role, data.sex,
        data.first_name, data.last_name, data.address,
        data.latitude, data.longitude, data.phone,
        data.group_id, data.brand_id
    )
  }

  async update(dto) {
    const sql = `UPDATE users SET first_name=$2, last_name=$3 WHERE id=$1 RETURNING *`
    return await this.fetch(
        sql,
        dto.id, dto.first_name, dto.last_name
    )
  }

  async delete(id) {
    return await this.fetch(
        `DELETE FROM users WHERE id=$1 RETURNING * `,
        id
    )
  }
}
