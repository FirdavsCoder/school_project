export class BrandEntity {
    constructor(dto) {
        this.name = dto.name
        this.is_public = dto.isPublic
    }
}