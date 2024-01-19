import {Router} from "express";
import {UserParentController} from "./user_parent.controller.js";
import {UserParentService} from "./user_parent.service.js";


const router = Router()

const userParentService = new UserParentService()
const userParentController = new UserParentController(userParentService)

router.post("/",
	(req, res) => {
		userParentController.insert(req, res)
	})

router.get("/",
	(req, res) => {
		userParentController.getAll(req, res)
	})


router.get("/:id",
	(req, res)=>{
		userParentController.getById(req, res)
	})

router.put("/:id",
	(req, res) => {
		userParentController.update(req, res)
	})

router.delete("/:id",
	(req, res) => {
		userParentController.delete(req, res)
	})




export default {router}