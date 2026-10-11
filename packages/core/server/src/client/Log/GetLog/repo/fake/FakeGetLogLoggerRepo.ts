import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetLog} from '@copor/core/domain/Log/logger/LogGetLog';

export class FakeGetLogLoggerRepo implements LogRepository<LogDataForGetLog> {
	save(logDTO: LogForSave<LogDataForGetLog>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
