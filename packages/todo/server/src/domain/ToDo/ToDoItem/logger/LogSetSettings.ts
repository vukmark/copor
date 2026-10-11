import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogSetSettings extends TypedLogger<LogDataForSetSettings> {
	getType(): string {
		return 'setSettings';
	}
}

export interface LogDataForSetSettings {
	alarmExists: boolean,
	displayedInCalendar: boolean
}