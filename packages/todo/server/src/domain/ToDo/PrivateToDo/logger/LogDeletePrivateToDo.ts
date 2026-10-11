import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeletePrivateToDo extends TypedLogger<LogDataForDeletePrivateToDo> {
	public getType(): string {
		return 'deletePrivateToDo';
	}
}

export interface LogDataForDeletePrivateToDo {
	toDoId: string;
}