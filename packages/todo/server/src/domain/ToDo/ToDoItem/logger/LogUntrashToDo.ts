import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUntrashToDo extends TypedLogger<LogDataForUntrashToDo> {
	public getType(): string {
		return 'untrashToDo';
	}
}

export interface LogDataForUntrashToDo {
	untrashedToDoId: string;
}