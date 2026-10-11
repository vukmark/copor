import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteAttachmentForToDo extends TypedLogger<LogDataForDeleteAttachmentForToDo> {
	getType(): string {
		return 'deleteAttachmentForToDo';
	}
}

export interface LogDataForDeleteAttachmentForToDo {
	deletedAttachmentId: string;
}