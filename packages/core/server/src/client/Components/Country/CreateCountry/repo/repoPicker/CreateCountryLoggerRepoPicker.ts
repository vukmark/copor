import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateCountry} from '@copor/core/domain/Components/Country/logger/LogCreateCountry';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateCountryLoggerRepo} from '../fake/FakeCreateCountryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateCountryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateCountry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateCountry>> {
		return {
			[DBEnv.FAKE]: FakeCreateCountryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
