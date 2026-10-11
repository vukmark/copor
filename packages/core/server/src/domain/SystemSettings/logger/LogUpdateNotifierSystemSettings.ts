import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateNotifierSystemSettings extends TypedLogger<LogDataForUpdateNotifierSystemSettings> {
	public getType(): string {
		return 'updateNotifierSystemSettings';
	}
}

export interface LogDataForUpdateNotifierSystemSettings {
	enabled: boolean;
}
