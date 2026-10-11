import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateChecklist} from '@copor/checklist/domain/Checklist/logger/LogCreateChecklist';

export class FakeCreateChecklistLoggerRepo implements LogRepository<LogDataForCreateChecklist> {
	save(logDTO: LogForSave<LogDataForCreateChecklist>): Promise<void> {
		return Promise.resolve();
	}
}
