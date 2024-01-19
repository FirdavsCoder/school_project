import {Router} from "express";
import {SchoolController} from "./school.controller.js";
import {SchoolService} from "./school.service.js";
import {AuthorizationMiddleware} from "../../middleware/middleware.js";


const authorization = new AuthorizationMiddleware()
const router = Router()
const schoolService = new SchoolService()
const schoolController = new SchoolController(schoolService)

router.post("/",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        schoolController.insert(req, res)
    })

router.get("/",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        schoolController.getAll(req, res)
    })


router.get("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res)=>{
        schoolController.getById(req, res)
    })

router.put("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        schoolController.update(req, res)
    })

router.delete("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        schoolController.delete(req, res)
    })




export default {router}