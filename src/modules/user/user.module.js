import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";

const router = Router();
const authorization = new AuthorizationMiddleware()
const userService = new UserService();
const userController = new UserController(userService);

router.get("/",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
  userController.getById(req, res)
})

router.post("/register",
    (req, res) => {
  userController.register(req, res)
    })

router.post("/login",
    (req, res) => {
  userController.login(req, res)
    })

router.put("/:id",
    (req, res) => {
  userController.update(req, res)
    })

router.delete("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
  userController.delete(req, res)
    })


export default { router };
