import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateState} from '@copor/core/domain/Components/State/logger/LogCreateState';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateStateLoggerRepo implements LogRepository<LogDataForCreateState> {
	save(logDTO: LogForSave<LogDataForCreateState>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
