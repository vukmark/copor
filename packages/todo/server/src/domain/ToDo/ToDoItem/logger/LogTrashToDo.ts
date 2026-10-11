import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogTrashToDo extends TypedLogger<LogDataForTrashToDo> {
	public getType(): string {
		return 'trashToDo';
	}
}

export interface LogDataForTrashToDo {
	trashedToDoId: string;
}