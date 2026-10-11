import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteContractType} from '@copor/core/domain/Components/ContractType/logger/LogDeleteContractType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteContractTypeLoggerRepo} from '../fake/FakeDeleteContractTypeLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteContractTypeLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteContractType>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteContractType>> {
		return {
			[DBEnv.FAKE]: FakeDeleteContractTypeLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}