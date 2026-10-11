import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogDeleteAiContextItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteAiContextItemLoggerRepo
implements LogRepository<LogDataForDeleteAiContextItem> {
	save(logDTO: LogForSave<LogDataForDeleteAiContextItem>): Promise<void> {
		return Promise.resolve();
	}
}