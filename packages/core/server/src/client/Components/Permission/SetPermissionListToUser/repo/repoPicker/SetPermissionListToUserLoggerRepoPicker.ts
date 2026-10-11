import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeSetPermissionListToUserLoggerRepo} from '../fake/FakeSetPermissionListToUserLoggerRepo';
import {LogDataForSetPermissionListToUser} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUser';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class SetPermissionListToUserLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForSetPermissionListToUser>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForSetPermissionListToUser>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
