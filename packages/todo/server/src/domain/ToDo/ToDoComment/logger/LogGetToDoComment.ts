import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetToDoComment extends TypedLogger<LogDataForGetToDoComment> {
	public getType(): string {
		return 'getToDoComment';
	}
}

export interface LogDataForGetToDoComment {
	id: string;
}