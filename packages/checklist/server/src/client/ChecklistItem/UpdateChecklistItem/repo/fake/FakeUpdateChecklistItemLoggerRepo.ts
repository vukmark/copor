import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogCreateChecklistItem';

export class FakeUpdateChecklistItemLoggerRepo implements LogRepository<LogDataForCreateChecklistItem> {
	save(logDTO: LogForSave<LogDataForCreateChecklistItem>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
