import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForSignContract} from '@copor/core/domain/Contract/logger/LogSignContract';

export class FakeSignContractLoggerRepo implements LogRepository<LogDataForSignContract> {
	save(logDTO: LogForSave<LogDataForSignContract>): Promise<void> {
		return Promise.resolve();
	}
}
