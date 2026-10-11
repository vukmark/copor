import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateContractType} from '@copor/core/domain/Components/ContractType/logger/LogUpdateContractType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateContractTypeLoggerRepo} from '../fake/FakeUpdateContractTypeLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateContractTypeLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateContractType>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateContractType>> {
		return {
			[DBEnv.FAKE]: FakeUpdateContractTypeLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
