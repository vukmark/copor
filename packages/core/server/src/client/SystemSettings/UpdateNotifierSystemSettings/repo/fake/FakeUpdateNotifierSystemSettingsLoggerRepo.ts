import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateNotifierSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateNotifierSystemSettings';

export class FakeUpdateNotifierSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateNotifierSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateNotifierSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
