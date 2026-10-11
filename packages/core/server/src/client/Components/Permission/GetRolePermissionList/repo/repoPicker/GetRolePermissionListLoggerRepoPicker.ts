import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeGetRolePermissionListLoggerRepo} from '../fake/FakeGetRolePermissionListLoggerRepo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetRolePermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetRolePermissionList';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetRolePermissionListLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetRolePermissionList>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetRolePermissionList>> {
		return {
			[DBEnv.FAKE]: FakeGetRolePermissionListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
