import { ResData } from "../../common/resData.js";
import {UpdateUserSchema, UserCreateSchema, UserGetByIdSchema, UserLoginSchema} from "./validation/user.schema.js";
import {UserBadRequestException} from "./exception/user.exception.js";


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

      res.status(400).json(resData);
    }
  }

  async getById(req, res) {
    try{
      const validatedDto = await UserGetByIdSchema.validate(req.params)
      if (validatedDto.error) {
        throw new UserBadRequestException(validatedDto.error.message)
      }
      const resData = await this.#userService.getById(req.params.id)
      res.status(resData.statusCode).json(resData);
    }
    catch (error) {
      const resData = new ResData(
          error.message,
          error.statusCode || 500,
          null,
          error
      );
      res.status(400).json(resData);
    }
  }

  async register(req, res) {
    try {
      const dto = req.body
      const validated = UserCreateSchema.validate(dto)
      if (validated.error) {
        throw UserBadRequestException(validated.error.message)
      }
      const resData = await this.#userService.registerUser(dto);
      res.set("token", resData.data.token)
      return res.status(resData.statusCode).json(resData);
    }
    catch (error) {
      const resData = new ResData(
          error.message,
          error.statusCode || 500,
          null,
          error
      );
      res.status(400).json(resData);
    }
  }
  async login(req, res) {
	  try {
		  const dto = req.body
		  const validated = UserLoginSchema.validate(dto)
		  if(validated.error) {
			  throw new UserBadRequestException(validated.error.message)
		  }
		  const resData = await this.#userService.loginUser(dto);
		  req.header("token", resData.data.token)
		  return res.status(resData.statusCode).json(resData)
	  }
	  catch (error) {
		  const resData = new ResData(
			  error.message,
			  error.statusCode || 500,
			  null,
			  error
		  );
		  res.status(400).json(resData);
	  }
  }

  async update(req, res) {
	  try {
		  const validatedId = UserGetByIdSchema.validate(req.params)
		  if (validatedId.error) {
			  throw new UserBadRequestException(validatedId.error.message)
		  }
		  const validated = UpdateUserSchema.validate(req.body)
		  if (validated.error) {
			  throw new UserBadRequestException(validated.error.message)
		  }
		  const resData =  await this.#userService.update(req.params.id, req.body)
		  return res.status(resData.statusCode).json(resData)
	  }
	  catch (error) {
		  const resData = new ResData(
			  error.message,
			  error.statusCode || 500,
			  null,
			  error
		  );
		  res.status(400).json(resData);
	  }
  }
  async delete(req, res) {
	  try {
		  const validatedDto = UserGetByIdSchema.validate(req.params)
		  if(validatedDto.error) {
			  throw new UserBadRequestException(validatedDto.error.message)
		  }
		  const resData = await this.#userService.delete(req.params.id)
		  return res.status(resData.statusCode).json(resData)
	  }
	  catch (error) {
		  const resData = new ResData(
			  error.message,
			  error.statusCode || 500,
			  null,
			  error
		  );
		  res.status(400).json(resData);
	  }
  }
}
