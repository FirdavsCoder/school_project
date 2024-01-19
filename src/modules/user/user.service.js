import { ResData } from "../../common/resData.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success login", 200, foundAll);

    return resData;
  }
}
