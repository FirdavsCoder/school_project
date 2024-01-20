import {Router} from "express";
import {LessonController} from "./lesson.controller.js";
import {LessonService} from "./lesson.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";




const router = Router()
const authorization = new AuthorizationMiddleware()
const lessonService = new LessonService()
const lessonController = new LessonController(lessonService)

router.post("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		lessonController.insert(req, res)
	})

router.get("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		lessonController.getAll(req, res)
	})


router.get("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res)=>{
		lessonController.getById(req, res)
	})

router.put("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		lessonController.update(req, res)
	})

router.delete("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		lessonController.delete(req, res)
	})




export default {router}
