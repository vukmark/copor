import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteAlarm extends TypedLogger<LogDataForDeleteAlarm> {
	getType(): string {
		return 'deleteAlarm';
	}
}
export interface LogDataForDeleteAlarm {
	id: string;
}
