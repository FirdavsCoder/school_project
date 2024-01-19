import {Router} from "express";
import {GroupController} from "./group.controller.js";
import {GroupService} from "./group.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";


const router = Router()
const authorization = new AuthorizationMiddleware()
const groupService = new GroupService()
const groupController = new GroupController(groupService)

router.post("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		groupController.insert(req, res)
	})

router.get("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		groupController.getAll(req, res)
	})


router.get("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res)=>{
		groupController.getById(req, res)
	})

router.put("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		groupController.update(req, res)
	})

router.delete("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		groupController.delete(req, res)
	})




export default {router}