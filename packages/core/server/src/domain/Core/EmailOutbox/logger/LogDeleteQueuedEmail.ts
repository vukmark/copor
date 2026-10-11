import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteQueuedEmail extends TypedLogger<LogDataForDeleteQueuedEmail> {
	getType(): string {
		return 'deleteQueuedEmail';
	}
}

export interface LogDataForDeleteQueuedEmail {
	emailId: string;
}