import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupTreeLoggerRepo} from '../fake/FakeGetUserGroupTreeLoggerRepo';

export class GetUserGroupTreeLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupTreeLoggerRepo,
			[DBEnv.KYSELY]: FakeGetUserGroupTreeLoggerRepo
		};
	}
}
