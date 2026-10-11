import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteFileLoggerRepo
} from '@copor/cloud/client/Cloud/DeleteFile/repo/fake/FakeDeleteFileLoggerRepo';
import {LogDataForDeleteFile} from '@copor/cloud/domain/Cloud/logger/LogDeleteFile';

export class DeleteFileLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteFile>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteFile>> {
		return {
			[DBEnv.FAKE]: FakeDeleteFileLoggerRepo,
			[DBEnv.KYSELY]: FakeDeleteFileLoggerRepo
		};
	}
}
