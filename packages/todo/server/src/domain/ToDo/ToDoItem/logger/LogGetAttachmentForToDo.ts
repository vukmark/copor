import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetAttachmentForToDo extends TypedLogger<LogDataForGetAttachmentForToDo> {
	getType(): string {
		return 'getAttachmentForToDo';
	}
}

export interface LogDataForGetAttachmentForToDo {
	attachmentId: string;
}
