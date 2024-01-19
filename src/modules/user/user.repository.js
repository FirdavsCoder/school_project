import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async findAll() {
    return await this.fetchAll("select * from users");
  }
  async findOneByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }
  async findOneById(id) {
    return await this.fetch("select * from users where id = $1", id);
  }

  async insert(data) {
    const SQL = `
    INSERT INTO users(
        login, password, role,
        sex, first_name, last_name,
        address, latitude, longitude,
        phone, group_id, brand_id
    )
    VALUES ($1, $2 $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `
    return await this.fetch(
        SQL,
        data.login, data.password, data.role, data.sex,
        data.first_name, data.last_name, data.address,
        data.latitude, data.longitude, data.phone,
        data.group_id, data.brand_id
    )
  }
}
