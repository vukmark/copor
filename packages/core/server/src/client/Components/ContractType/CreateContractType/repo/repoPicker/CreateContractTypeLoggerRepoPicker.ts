import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateContractType} from '@copor/core/domain/Components/ContractType/logger/LogCreateContractType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateContractTypeLoggerRepo} from '../fake/FakeCreateContractTypeLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateContractTypeLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateContractType>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateContractType>> {
		return {
			[DBEnv.FAKE]: FakeCreateContractTypeLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
