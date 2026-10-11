import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteCountry} from '@copor/core/domain/Components/Country/logger/LogDeleteCountry';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeDeleteCountryLoggerRepo} from '../fakeRepo/FakeDeleteCountryLoggerRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteCountryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteCountry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteCountry>> {
		return {
			[DBEnv.FAKE]: FakeDeleteCountryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}