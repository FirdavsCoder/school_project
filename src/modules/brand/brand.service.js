import {ResData} from "../../common/resData.js";
import {BrandRepository} from "./brand.repository.js";
import {BrandEntity} from "./entity/brand.entity.js";
import {BrandNotFoundException} from "./exception/brand.exception.js";

export class BrandService {
    #repository;
    constructor() {
        this.#repository = new BrandRepository()
    }

    async insert(dto) {
        const newBrand = new BrandEntity(dto)
        const addedNewBrand = await this.#repository.insert(newBrand)
        return new ResData(
            "Successfully added",
            201,
            addedNewBrand
        )
    }

    async getAll() {
        const allBrands = await this.#repository.getAll()
        return new ResData(
            "All Brands",
            200,
            allBrands
        )
    }

    async getById(id) {
        const foundBrand = await this.#repository.getById(id)
        if (!foundBrand) {
            throw new BrandNotFoundException()
        }
        return new ResData(
            "Successfully found",
            200,
            foundBrand
        )
    }

    async update(id, dto) {
        await this.getById(id)
        const updateBrand = new BrandEntity(dto)
        updateBrand.id = id
        const updatedBrand = await this.#repository.update(updateBrand)
        return new ResData(
            "Successfully updated",
            200,
            updatedBrand
        )
    }

    async delete(id) {
        await this.getById(id)
        const deletedBrand = await this.#repository.delete(id)
        return new ResData(
            "Successfully deleted",
            200,
            deletedBrand
        )
    }
}