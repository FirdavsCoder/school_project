import {Router} from "express";
import {BrandController} from "./brand.controller.js";
import {BrandService} from "./brand.service.js";

const router = Router()

const brandService = new BrandService()
const brandController = new BrandController(brandService)

router.post("/",
    (req, res) => {
        brandController.insert(req, res)
    })

router.get("/",
    (req, res) => {
       brandController.getAll(req, res)
    })


router.get("/:id",
    (req, res)=>{
        brandController.getById(req, res)
    })

router.put("/:id",
    (req, res) => {
    brandController.update(req, res)
    })

router.delete("/:id",
    (req, res) => {
    brandController.delete(req, res)
    })




export default {router}