import { ResData } from "../../common/resData.js";

export class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getAll(req, res) {
    try {
      const resData = await this.#userService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
