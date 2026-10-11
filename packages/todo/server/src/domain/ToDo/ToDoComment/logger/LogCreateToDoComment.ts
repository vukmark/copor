import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateToDoComment extends TypedLogger<LogDataForCreateToDoComment> {
	getType(): string {
		return 'createToDoComment';
	}
}
export interface LogDataForCreateToDoComment {
	id: string,
	content: string,
	toDoId: string,
	actorId: string,
	createdAt: Date,
}
