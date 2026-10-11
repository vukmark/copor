import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateTimeZoneSystemSettings extends TypedLogger<LogDataForUpdateTimeZoneSystemSettings> {
	public getType(): string {
		return 'updateTimeZoneSystemSettings';
	}
}

export interface LogDataForUpdateTimeZoneSystemSettings {
	timeZone: string;
}
