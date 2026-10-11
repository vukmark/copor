import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateCountry} from '@copor/core/domain/Components/Country/logger/LogUpdateCountry';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCountryLoggerRepo} from '../fake/FakeUpdateCountryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateCountryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateCountry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateCountry>> {
		return {
			[DBEnv.FAKE]: FakeUpdateCountryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
