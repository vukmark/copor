import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeCheckRolePermissionDependenciesLoggerRepo} from '../fake/FakeCheckRolePermissionDependenciesLoggerRepo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForCheckRolePermissionDependencies
} from '@copor/core/domain/Components/Permission/logger/LogCheckRolePermissionDependencies';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CheckRolePermissionDependenciesLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCheckRolePermissionDependencies>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCheckRolePermissionDependencies>> {
		return {
			[DBEnv.FAKE]: FakeCheckRolePermissionDependenciesLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
