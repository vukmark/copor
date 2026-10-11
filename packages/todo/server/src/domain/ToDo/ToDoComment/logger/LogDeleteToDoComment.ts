import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteToDoComment extends TypedLogger<LogDataForDeleteToDoComment> {
	public getType(): string {
		return 'deleteToDoComment';
	}
}

export interface LogDataForDeleteToDoComment {
	deletedCommentId: string;
}