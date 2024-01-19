import {Router} from "express";
import {TeacherSubjectController} from "./teacherSubject.controller.js";
import {TeacherSubjectService} from "./teacherSubject.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";


const router = Router()
const authorization = new AuthorizationMiddleware()
const teacherSubjectService = new TeacherSubjectService()
const teacherSubjectController = new TeacherSubjectController(teacherSubjectService)



router.post("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		teacherSubjectController.insert(req, res)
	})

router.get("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		teacherSubjectController.getAll(req, res)
	})


router.get("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res)=>{
		teacherSubjectController.getById(req, res)
	})

router.put("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		teacherSubjectController.update(req, res)
	})

router.delete("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		teacherSubjectController.delete(req, res)
	})




export default {router}