import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateSettings extends TypedLogger<LogDataForUpdateSettings> {
	public getType(): string {
		return 'updateSettings';
	}
}

export interface LogDataForUpdateSettings {
	id: string;
	darkMode: boolean;
	expertMode: boolean;
	waiAria: boolean;
	avatar: string;
}