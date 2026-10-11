import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetState} from '@copor/core/domain/Components/State/logger/LogGetState';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetStateLoggerRepo} from '@copor/core/client/Components/State/GetState/repo/fake/FakeGetStateLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetStateLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetState>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetState>> {
		return {
			[DBEnv.FAKE]: FakeGetStateLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
