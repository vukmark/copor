import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupLoggerRepo} from '../fake/FakeGetUserGroupLoggerRepo';

export class GetUserGroupLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetUserGroup>> {
		return {
			[DBEnv.KYSELY]: FakeGetUserGroupLoggerRepo,
			[DBEnv.FAKE]: FakeGetUserGroupLoggerRepo
		};
	}
}
