import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateUserGroup} from '@copor/core/domain/UserGroup/logger/LogUpdateUserGroup';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserGroupLoggerRepo} from '../fake/FakeUpdateUserGroupLoggerRepo';

export class UpdateUserGroupLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateUserGroup>> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserGroupLoggerRepo,
			[DBEnv.KYSELY]: FakeUpdateUserGroupLoggerRepo
		};
	}
}
