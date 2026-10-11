import {FakeGetUserLoggerRepo} from '../fake/FakeGetUserLoggerRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForGetUser} from '@copor/core/domain/User/logger/LogGetUser';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetUserLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetUser>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetUser>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetUserLoggerRepo
		};
	}
}