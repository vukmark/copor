import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogCreateAiContextItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyCreateAiContextItemLoggerRepo
implements LogRepository<LogDataForCreateAiContextItem> {
	save(logDTO: LogForSave<LogDataForCreateAiContextItem>): Promise<void> {
		return Promise.resolve();
	}
}