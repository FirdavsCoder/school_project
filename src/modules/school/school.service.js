import {ResData} from "../../common/resData.js";
import {SchoolNotFoundException} from "./exception/school.exception.js";
import {SchoolRepository} from "./school.repository.js";
import {SchoolEntity} from "./entity/school.entity.js";


export class SchoolService {
    #repository;
    constructor() {
        this.#repository = new SchoolRepository()
    }

    async insert(dto) {
        const newSchool = new SchoolEntity(dto)
        const addedNewSchool = await this.#repository.insert(newSchool)
        return new ResData(
            "Successfully added",
            201,
            addedNewSchool
        )
    }

    async getAll() {
        const allSchools = await this.#repository.getAll()
        return new ResData(
            "All Schools",
            200,
            allSchools
        )
    }

    async getById(id) {
        const foundSchool = await this.#repository.getById(id)
        if (!foundSchool) {
            throw new SchoolNotFoundException()
        }
        return new ResData(
            "Successfully found",
            200,
            foundSchool
        )
    }

    async update(id, dto) {
        await this.getById(id)
        const updateSchool = new SchoolEntity(dto)
        updateSchool.id = id
        const updatedSchool = await this.#repository.update(updateSchool)
        return new ResData(
            "Successfully updated",
            200,
            updatedSchool
        )
    }


    async delete(id) {
        await this.getById(id)
        const deletedSchool = await this.#repository.delete(id)
        return new ResData(
            "Successfully deleted",
            200,
            deletedSchool
        )
    }
}