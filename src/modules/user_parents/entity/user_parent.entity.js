export class UserParentEntity {
	constructor(dto) {
		this.child_id = dto.childId
		this.parent_id = dto.parentId
	}
}