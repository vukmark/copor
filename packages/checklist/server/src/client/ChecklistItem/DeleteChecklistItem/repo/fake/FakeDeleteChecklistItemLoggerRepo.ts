import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogDeleteChecklistItem';

export class FakeDeleteChecklistItemLoggerRepo implements LogRepository<LogDataForDeleteChecklistItem> {
	save(logDTO: LogForSave<LogDataForDeleteChecklistItem>): Promise<void> {
		return Promise.resolve();
	}
}
