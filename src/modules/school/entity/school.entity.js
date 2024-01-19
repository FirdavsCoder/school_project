export class SchoolEntity {
    constructor(dto) {
        this.name = dto.name
        this.address = dto.address
        this.latitude = dto.latitude
        this.longitude = dto.longitude
        this.phone = dto.phone
        this.brand_id = dto.brandId
    }
}

