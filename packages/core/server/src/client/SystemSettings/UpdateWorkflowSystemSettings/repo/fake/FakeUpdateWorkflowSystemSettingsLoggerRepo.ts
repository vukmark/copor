import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateWorkflowSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateWorkflowSystemSettings';

export class FakeUpdateWorkflowSystemSettingsLoggerRepo implements LogRepository<LogDataForUpdateWorkflowSystemSettings> {
	save(logDTO: LogForSave<LogDataForUpdateWorkflowSystemSettings>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
