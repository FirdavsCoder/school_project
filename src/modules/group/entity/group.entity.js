export class GroupEntity {
	constructor(dto) {
		this.name = dto.name
		this.brand_id = dto.brandId
		this.head_teacher_id = dto.headTeacherId
		this.room_id = dto.roomId
	}
}