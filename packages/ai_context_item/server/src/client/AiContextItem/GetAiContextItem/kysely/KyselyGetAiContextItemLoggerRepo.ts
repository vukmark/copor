import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItem';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyGetAiContextItemLoggerRepo
implements LogRepository<LogDataForGetAiContextItem> {
	save(logDTO: LogForSave<LogDataForGetAiContextItem>): Promise<void> {
		return Promise.resolve();
	}
}