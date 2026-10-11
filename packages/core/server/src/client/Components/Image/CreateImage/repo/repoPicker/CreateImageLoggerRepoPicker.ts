import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateImage} from '@copor/core/domain/Components/Image/logger/LogCreateImage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateImageLoggerRepo} from '../fake/FakeCreateImageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateImageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateImage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateImage>> {
		return {
			[DBEnv.FAKE]: FakeCreateImageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
