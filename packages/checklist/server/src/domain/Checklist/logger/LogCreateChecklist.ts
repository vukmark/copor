import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateChecklist extends TypedLogger<LogDataForCreateChecklist> {
	getType(): string {
		return 'createChecklist';
	}
}

export interface LogDataForCreateChecklist {
	id: string;
	title?: string;
}
