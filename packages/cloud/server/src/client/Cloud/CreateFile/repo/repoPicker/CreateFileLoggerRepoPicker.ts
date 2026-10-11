import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateFileLoggerRepo
} from '@copor/cloud/client/Cloud/CreateFile/repo/fake/FakeCreateFileLoggerRepo';
import {LogDataForCreateFile} from '@copor/cloud/domain/Cloud/logger/LogCreateFile';

export class CreateFileLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateFile>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateFile>> {
		return {
			[DBEnv.FAKE]: FakeCreateFileLoggerRepo,
			[DBEnv.KYSELY]: FakeCreateFileLoggerRepo
		};
	}
}
