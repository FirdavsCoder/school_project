import {Router} from "express";

import {AuthorizationMiddleware} from "../../middleware/middleware.js";
import {SubjectController} from "./subject.controller.js";
import {SubjectService} from "./subject.service.js";


const router = Router()
const authorization = new AuthorizationMiddleware()
const subjectService = new SubjectService()
const subjectController = new SubjectController(subjectService)

router.post("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		subjectController.insert(req, res)
	})

router.get("/",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		subjectController.getAll(req, res)
	})


router.get("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res)=>{
		subjectController.getById(req, res)
	})

router.put("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		subjectController.update(req, res)
	})

router.delete("/:id",
	authorization.checkUser,
	authorization.authorization,
	authorization.adminRole,
	(req, res) => {
		subjectController.delete(req, res)
	})




export default {router}