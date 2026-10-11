export interface IsInvalidToDoAttachmentRepo {
	isInvalidToDoAttachment(attachmentId: string | undefined): Promise<boolean>;
}
