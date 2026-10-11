import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForAddUserToUserGroup} from '@copor/core/domain/UserGroup/logger/LogAddUserToUserGroup';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeAddUserToUserGroupLoggerRepo
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/fake/FakeAddUserToUserGroupLoggerRepo';

export class AddUserToUserGroupLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForAddUserToUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForAddUserToUserGroup>> {
		return {
			[DBEnv.FAKE]: FakeAddUserToUserGroupLoggerRepo,
			[DBEnv.KYSELY]: FakeAddUserToUserGroupLoggerRepo
		};
	}
}