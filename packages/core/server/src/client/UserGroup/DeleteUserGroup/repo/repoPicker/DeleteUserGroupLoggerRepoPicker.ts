import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForDeleteUserGroup}
	from '@copor/core/domain/UserGroup/logger/LogDeleteUserGroup';
import {
	FakeDeleteUserGroupLoggerRepo
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/fake/FakeDeleteUserGroupLoggerRepo';

export class DeleteUserGroupLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteUserGroup>> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserGroupLoggerRepo,
			[DBEnv.KYSELY]: FakeDeleteUserGroupLoggerRepo
		};
	}
}
