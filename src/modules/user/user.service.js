import {ResData} from "../../common/resData.js";
import {UserRepository} from "./user.repository.js";
import {UserEntity} from "./entity/user.entity.js";
import {UserBadRequestException, UserNotFoundException} from "./exception/user.exception.js";
import {compare, hashed} from "../../lib/bcript.js";
import {generateToken} from "../../lib/jwt.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async getAll() {
    return new ResData("All Users", 200, await this.#repository.findAll());
  }

  // GET USER BY LOGIN
  async getUserByLogin(login) {
    const foundUser = await this.#repository.findOneByLogin(login)
    let resData;
    if (foundUser) {
      resData = new ResData("Found User By Login", 200, foundUser);
    } else {
      resData = new ResData("Not Found", 404, null);
    }
    return resData;
  }

  // User Login
  async loginUser(dto) {
    const foundUserByLogin = await this.getUserByLogin(dto.login);
    if (!foundUserByLogin.data) {
      throw new UserNotFoundException();
    }
    const isValidPassword = await compare(
        dto.password,
        foundUserByLogin.data.password
    );
    if (!isValidPassword) {
      throw new UserBadRequestException("Login or Password is wrong!");
    }

    // const newToken = generateToken(foundUserByLogin.data.id);
    return new ResData("Successfully Logged In", 200, {
      token: generateToken(foundUserByLogin.data.id),
      user: foundUserByLogin.data,
    });
  }


  async registerUser(dto) {
    const foundUserByLogin= await this.#repository.findOneByLogin(dto.login);
    if (foundUserByLogin) {
      throw new UserNotFoundException("Login is already exist");
    }
    const hashedPassword = await hashed(dto.password);
    const userObject = Object.assign(dto, {password: hashedPassword})
    const newUser = new UserEntity(userObject)
    const addedNewUser = await this.#repository.insert(newUser)

    const newToken = generateToken(addedNewUser.id)
    return new ResData(
        "Successfully registered",
        201,
        {token: newToken,user: addedNewUser}
    )
  }


  async getById(id) {
    const foundUser = await this.#repository.getById(id)
    if (!foundUser) {
      throw new UserNotFoundException()
    }
    return new ResData(
        "Successfully found",
        200,
        foundUser
    )
  }

  async update(id, dto) {
    await this.getById(id)
    const updateUser = new UserEntity(dto)
    updateUser.id = id
    const updatedUser = await this.#repository.update(updateUser)
    return new ResData(
        "Successfully updated",
        200,
        updatedUser
    )
  }

  async delete(id) {
    await this.getById(id)
    const deletedUser = await this.#repository.delete(id)
    return new ResData(
        "Successfully deleted",
        200,
        deletedUser
    )
  }
}
