export class RoomEntity {
	constructor(dto) {
		this.number = dto.number
		this.name = dto.name
		this.floor = dto.floor
		this.capacity = dto.capacity
		this.school_id = dto.schoolId
	}
}

