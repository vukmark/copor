import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForAssignUsersToToDo {
	userIds: string[],
	todoId: string
}

export class LogAssignUsersToToDo extends TypedLogger<LogDataForAssignUsersToToDo> {
	public getType(): string {
		return 'assignUsersToToDo';
	}
}

