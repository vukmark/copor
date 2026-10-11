import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateAttachmentForToDo extends TypedLogger<LogDataForCreateAttachmentForToDo> {
	getType(): string {
		return 'createAttachmentForToDo';
	}
}

export interface LogDataForCreateAttachmentForToDo {
	id: string;
	name: string;
	size: number;
	todoId: string;
}
