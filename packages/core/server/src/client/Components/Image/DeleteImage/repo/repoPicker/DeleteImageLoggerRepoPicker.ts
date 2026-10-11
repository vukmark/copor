import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteImage} from '@copor/core/domain/Components/Image/logger/LogDeleteImage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteImageLoggerRepo} from '../fake/FakeDeleteImageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteImageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteImage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteImage>> {
		return {
			[DBEnv.FAKE]: FakeDeleteImageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}