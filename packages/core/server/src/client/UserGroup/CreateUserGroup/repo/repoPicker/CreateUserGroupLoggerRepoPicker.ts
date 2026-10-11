import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForCreateUserGroup}
	from '@copor/core/domain/UserGroup/logger/LogCreateUserGroup';
import {
	FakeCreateUserGroupLoggerRepo
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/fake/FakeCreateUserGroupLoggerRepo';

export class CreateUserGroupLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateUserGroup>> {
		return {
			[DBEnv.FAKE]: FakeCreateUserGroupLoggerRepo,
			[DBEnv.KYSELY]: FakeCreateUserGroupLoggerRepo
		};
	}
}
