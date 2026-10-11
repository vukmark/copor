import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetAlarm extends TypedLogger<LogDataForGetAlarm> {
	getType(): string {
		return 'getAlarm';
	}
}

export interface LogDataForGetAlarm {
	alarmId: string;
}
