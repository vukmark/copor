import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetState} from '@copor/core/domain/Components/State/logger/LogGetState';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetStateLoggerRepo implements LogRepository<LogDataForGetState> {
	save(logDTO: LogForSave<LogDataForGetState>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}