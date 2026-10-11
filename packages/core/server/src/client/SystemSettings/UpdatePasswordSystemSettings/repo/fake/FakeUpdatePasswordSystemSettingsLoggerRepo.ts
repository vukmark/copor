import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdatePasswordSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdatePasswordSystemSettings';

export class FakeUpdatePasswordSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdatePasswordSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdatePasswordSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
