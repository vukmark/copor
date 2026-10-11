import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateSMTPSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateSMTPSystemSettings';

export class FakeUpdateSMTPSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateSMTPSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateSMTPSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
