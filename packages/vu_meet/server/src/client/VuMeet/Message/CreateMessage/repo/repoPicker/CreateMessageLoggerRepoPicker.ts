import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateMessageLoggerRepo} from '../fake/FakeCreateMessageLoggerRepo';
import {LogDataForCreateMessage}
	from '@copor/vu_meet/domain/VuMeet/Message/logger/LogCreateMessage';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateMessageLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateMessage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateMessage>> {
		return {
			[DBEnv.FAKE]: FakeCreateMessageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
