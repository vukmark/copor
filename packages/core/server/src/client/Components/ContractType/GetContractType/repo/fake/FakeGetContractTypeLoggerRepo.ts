import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContractType} from '@copor/core/domain/Components/ContractType/logger/LogGetContractType';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetContractTypeLoggerRepo implements LogRepository<LogDataForGetContractType> {
	save(logDTO: LogForSave<LogDataForGetContractType>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
