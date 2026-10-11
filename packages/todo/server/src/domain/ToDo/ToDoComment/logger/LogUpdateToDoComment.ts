import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateToDoComment extends TypedLogger<LogDataForUpdateToDoComment> {
	getType(): string {
		return 'updateToDoComment';
	}
}

export interface LogDataForUpdateToDoComment {
	id: string;
	toDoId: string;
	content: string;
	actorId: string;
}
