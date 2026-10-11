import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogUpdateAiContextItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateAiContextItemLoggerRepo
implements LogRepository<LogDataForUpdateAiContextItem> {
	save(logDTO: LogForSave<LogDataForUpdateAiContextItem>): Promise<void> {
		return Promise.resolve(undefined);
	}
}