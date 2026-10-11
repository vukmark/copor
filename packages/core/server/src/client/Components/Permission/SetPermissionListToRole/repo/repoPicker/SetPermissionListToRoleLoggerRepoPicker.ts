import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeSetPermissionListToRoleLoggerRepo} from '../fake/FakeSetPermissionListToRoleLoggerRepo';
import {LogDataForSetPermissionListToRole}
	from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToRole';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class SetPermissionListToRoleLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForSetPermissionListToRole>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForSetPermissionListToRole>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToRoleLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
