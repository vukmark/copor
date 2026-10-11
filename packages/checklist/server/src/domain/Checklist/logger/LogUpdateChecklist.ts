import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateChecklist extends TypedLogger<LogDataForUpdateChecklist> {
	getType(): string {
		return 'editChecklist';
	}
}

export interface LogDataForUpdateChecklist {
	id: string;
	title?: string;
}
