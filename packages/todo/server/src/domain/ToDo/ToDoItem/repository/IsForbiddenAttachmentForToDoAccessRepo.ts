export interface IsForbiddenAttachmentForToDoAccessRepo {
	isForbiddenAttachmentForToDoAccess(attachmentId: string, actorId: string): Promise<boolean>;
}
