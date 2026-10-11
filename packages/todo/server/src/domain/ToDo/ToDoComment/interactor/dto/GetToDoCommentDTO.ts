export interface GetToDoCommentDTO {
	id: string;
	toDoId: string;
	content: string;
	actorId: string;
	createdAt: Date;
}