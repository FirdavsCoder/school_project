import {Router} from "express";
import {RoomController} from "./room.controller.js";
import {RoomService} from "./room.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";


const router = Router()
const authorization = new AuthorizationMiddleware()
const roomService = new RoomService()
const roomController = new RoomController(roomService)

router.post("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		roomController.insert(req, res)
	})

router.get("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		roomController.getAll(req, res)
	})


router.get("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res)=>{
		roomController.getById(req, res)
	})

router.put("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		roomController.update(req, res)
	})

router.delete("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		roomController.delete(req, res)
	})




export default {router}