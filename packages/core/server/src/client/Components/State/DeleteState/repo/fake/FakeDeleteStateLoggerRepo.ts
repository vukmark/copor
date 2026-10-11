import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteState} from '@copor/core/domain/Components/State/logger/LogDeleteState';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteStateLoggerRepo implements LogRepository<LogDataForDeleteState> {
	save(logDTO: LogForSave<LogDataForDeleteState>): Promise<void> {
		return Promise.resolve();
	}
}