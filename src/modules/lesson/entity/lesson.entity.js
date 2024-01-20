export class LessonEntity {
	constructor(dto) {
		this.teacher_id = dto.teacherId
		this.subject_id = dto.subjectId
		this.group_id = dto.groupId
		this.room_id = dto.roomId
		this.start_time = dto.startTime
		this.end_time = dto.endTime
		this.started_time = dto.startedTime
		this.ended_time = dto.endedTime
	}
}