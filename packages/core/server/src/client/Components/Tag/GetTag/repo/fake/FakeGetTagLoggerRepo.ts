import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetTag} from '@copor/core/domain/Components/Tag/logger/LogGetTag';

export class FakeGetTagLoggerRepo implements LogRepository<LogDataForGetTag> {
	save(logDTO: LogForSave<LogDataForGetTag>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
