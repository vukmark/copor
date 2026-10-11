import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetVuMeetFileLoggerRepo} from '../fake/FakeGetVuMeetFileLoggerRepo';
import {LogDataForGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetVuMeetFile';

export class GetVuMeetFileLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetVuMeetFile>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetVuMeetFile>> {
		return {
			[DBEnv.KYSELY]: FakeGetVuMeetFileLoggerRepo,
			[DBEnv.FAKE]: FakeGetVuMeetFileLoggerRepo
		};
	}
}
