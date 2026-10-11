import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFileListLoggerRepo} from '../fake/FakeGetFileListLoggerRepo';

export class GetFileListLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetFileListLoggerRepo,
			[DBEnv.KYSELY]: FakeGetFileListLoggerRepo
		};
	}
}
