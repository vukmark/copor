import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateContractType} from '@copor/core/domain/Components/ContractType/logger/LogCreateContractType';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateContractTypeLoggerRepo implements LogRepository<LogDataForCreateContractType> {
	save(logDTO: LogForSave<LogDataForCreateContractType>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
