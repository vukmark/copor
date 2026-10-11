import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateTimeZoneSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateTimeZoneSystemSettings';

export class FakeUpdateTimeZoneSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateTimeZoneSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateTimeZoneSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
