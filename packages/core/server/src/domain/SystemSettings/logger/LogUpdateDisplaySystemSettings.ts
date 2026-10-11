import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateDisplaySystemSettings extends TypedLogger<LogDataForUpdateDisplaySystemSettings> {
	public getType(): string {
		return 'updateGlobalSystemSettings';
	}
}

export interface LogDataForUpdateDisplaySystemSettings {
	showDetailedErrors: boolean;
}