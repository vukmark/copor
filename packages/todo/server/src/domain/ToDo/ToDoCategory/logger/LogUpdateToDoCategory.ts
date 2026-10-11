import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateToDoCategory extends TypedLogger<LogDataForUpdateToDoCategory> {
	getType(): string {
		return 'updateToDoCategory';
	}
}

export interface LogDataForUpdateToDoCategory {
	id: string,
	name: string,
	description: string
}
