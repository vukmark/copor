import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSearchAllMessagesLoggerRepo} from '../fake/FakeSearchAllMessagesLoggerRepo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogSearchAllMessages';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetSearchAllMessagesListLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForSearchAllMessages>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForSearchAllMessages>> {
		return {
			[DBEnv.FAKE]: FakeSearchAllMessagesLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
