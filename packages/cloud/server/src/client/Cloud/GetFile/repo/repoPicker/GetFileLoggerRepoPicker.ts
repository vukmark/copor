import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFileLoggerRepo} from '../fake/FakeGetFileLoggerRepo';
import {LogDataForGetFile} from '@copor/cloud/domain/Cloud/logger/LogGetFile';

export class GetFileLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetFile>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetFile>> {
		return {
			[DBEnv.KYSELY]: FakeGetFileLoggerRepo,
			[DBEnv.FAKE]: FakeGetFileLoggerRepo
		};
	}
}
