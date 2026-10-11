import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChatLoggerRepo} from '../fake/FakeUpdateChatLoggerRepo';
import {LogDataForUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogUpdateChat';

export class UpdateChatLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateChat>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateChat>> {
		return {
			[DBEnv.FAKE]: FakeUpdateChatLoggerRepo,
			[DBEnv.KYSELY]: FakeUpdateChatLoggerRepo
		};
	}
}
