import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForSetUserGroupUserList} from '@copor/core/domain/UserGroup/logger/LogSetUserGroupUserList';
import {
	FakeSetUserGroupUserListLoggerRepo
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/fake/FakeSetUserGroupUserListLoggerRepo';

export class SetUserGroupUserListLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForSetUserGroupUserList>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForSetUserGroupUserList>> {
		return {
			[DBEnv.FAKE]: FakeSetUserGroupUserListLoggerRepo,
			[DBEnv.KYSELY]: FakeSetUserGroupUserListLoggerRepo
		};
	}
}
