export interface IsForbiddenToDoAttachmentAccessRepo {
	isForbiddenToDoAttachmentAccess(todoId: string, actorId: string): Promise<boolean>;
}
