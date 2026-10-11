import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateQueuedEmail extends TypedLogger<LogDataForCreateQueuedEmail> {
	public getType(): string {
		return 'createQueuedEmail';
	}
}

export interface LogDataForCreateQueuedEmail {
	id: string;
	type: string;
	receiver: string;
	subject?: string;
}