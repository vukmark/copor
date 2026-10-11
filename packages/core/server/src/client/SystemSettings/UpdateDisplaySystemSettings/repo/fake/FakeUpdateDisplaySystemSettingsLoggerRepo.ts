import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateDisplaySystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateDisplaySystemSettings';

export class FakeUpdateDisplaySystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateDisplaySystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateDisplaySystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}