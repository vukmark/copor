import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateGlobalSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateGlobalSystemSettings';

export class FakeUpdateGlobalSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateGlobalSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateGlobalSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
