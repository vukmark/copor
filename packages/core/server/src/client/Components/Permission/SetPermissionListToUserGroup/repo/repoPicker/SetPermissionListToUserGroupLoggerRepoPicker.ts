import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSetPermissionListToUserGroupLoggerRepo} from '../fake/FakeSetPermissionListToUserGroupLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	LogDataForSetPermissionListToUserGroup
} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUserGroup';

export class SetPermissionListToUserGroupLoggerRepoPicker extends
	NewRepositoryPicker<LogRepository<LogDataForSetPermissionListToUserGroup>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForSetPermissionListToUserGroup>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserGroupLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
