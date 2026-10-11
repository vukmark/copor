import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteChecklist} from '@copor/checklist/domain/Checklist/logger/LogDeleteChecklist';

export class FakeDeleteChecklistLoggerRepo implements LogRepository<LogDataForDeleteChecklist> {
	save(logDTO: LogForSave<LogDataForDeleteChecklist>): Promise<void> {
		return Promise.resolve();
	}
}
