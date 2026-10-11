import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCountryLoggerRepo} from '../fake/FakeGetCountryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetCountryLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetCountry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetCountry>> {
		return {
			[DBEnv.FAKE]: FakeGetCountryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
