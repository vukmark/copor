import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteContractType} from '@copor/core/domain/Components/ContractType/logger/LogDeleteContractType';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteContractTypeLoggerRepo implements LogRepository<LogDataForDeleteContractType> {
	save(logDTO: LogForSave<LogDataForDeleteContractType>): Promise<void> {
		return Promise.resolve();
	}
}