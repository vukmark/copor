import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateGlobalSystemSettings extends TypedLogger<LogDataForUpdateGlobalSystemSettings> {
	public getType(): string {
		return 'updateGlobalSystemSettings';
	}
}

export interface LogDataForUpdateGlobalSystemSettings {
	name: string;
	allowSelfRegistration?: boolean;
}