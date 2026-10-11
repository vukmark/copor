import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateTag} from '@copor/core/domain/Components/Tag/logger/LogCreateTag';

export class FakeCreateTagLoggerRepo implements LogRepository<LogDataForCreateTag> {
	save(logDTO: LogForSave<LogDataForCreateTag>): Promise<void> {
		return Promise.resolve();
	}
}
