import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateChecklist} from '@copor/checklist/domain/Checklist/logger/LogCreateChecklist';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateChecklistLoggerRepo implements LogRepository<LogDataForCreateChecklist> {
	save(logDTO: LogForSave<LogDataForCreateChecklist>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
