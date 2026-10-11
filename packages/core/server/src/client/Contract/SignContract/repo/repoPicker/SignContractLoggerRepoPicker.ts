import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSignContractLoggerRepo} from '../fake/FakeSignContractLoggerRepo';
import {LogDataForSignContract} from '@copor/core/domain/Contract/logger/LogSignContract';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class SignContractLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForSignContract>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForSignContract>> {
		return {
			[DBEnv.FAKE]: FakeSignContractLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
