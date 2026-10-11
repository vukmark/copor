import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetPrivateToDo extends TypedLogger<LogDataForGetPrivateToDo> {
	public getType(): string {
		return 'getPrivateToDo';
	}
}

export interface LogDataForGetPrivateToDo {
	todoId: string;
}