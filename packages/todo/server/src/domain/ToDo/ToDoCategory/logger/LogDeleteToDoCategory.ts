import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteToDoCategory extends TypedLogger<LogDataForDeleteToDoCategory> {
	getType(): string {
		return 'deleteToDoCategory';
	}
}
export interface LogDataForDeleteToDoCategory {
	categoryId: string;
}
