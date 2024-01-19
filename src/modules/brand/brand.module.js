import {Router} from "express";
import {BrandController} from "./brand.controller.js";
import {BrandService} from "./brand.service.js";

const brandRouter = Router()

const brandService = new BrandService()
const brandController = new BrandController(brandService)

brandRouter.post("/",
    (req, res) => {
        brandController.insert(req, res)
    })

brandRouter.get("/",
    (req, res) => {
       brandController.getAll(req, res)
    })


brandRouter.get("/:id",
    (req, res)=>{
        brandController.getById(req, res)
    })

brandRouter.put("/:id",
    (req, res) => {
    brandController.update(req, res)
    })

brandRouter.delete("/:id",
    (req, res) => {
    brandController.delete(req, res)
    })




export default {brandRouter}