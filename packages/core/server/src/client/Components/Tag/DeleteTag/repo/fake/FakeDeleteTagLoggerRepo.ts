import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteTag} from '@copor/core/domain/Components/Tag/logger/LogDeleteTag';

export class FakeDeleteTagLoggerRepo implements LogRepository<LogDataForDeleteTag> {
	save(logDTO: LogForSave<LogDataForDeleteTag>): Promise<void> {
		return Promise.resolve();
	}
}