import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContractType} from '@copor/core/domain/Components/ContractType/logger/LogGetContractType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetContractTypeLoggerRepo} from '../fake/FakeGetContractTypeLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetContractTypeLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetContractType>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetContractType>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetContractTypeLoggerRepo
		};
	}
}
