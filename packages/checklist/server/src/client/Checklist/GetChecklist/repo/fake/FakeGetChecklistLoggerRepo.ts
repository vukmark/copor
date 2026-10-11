import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetChecklist} from '@copor/checklist/domain/Checklist/logger/LogGetChecklist';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetChecklistLoggerRepo implements LogRepository<LogDataForGetChecklist> {
	save(logDTO: LogForSave<LogDataForGetChecklist>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
