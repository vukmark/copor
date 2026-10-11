import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRole} from '@copor/core/domain/Components/Role/logger/LogCreateRole';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateRoleLoggerRepo} from '../fake/FakeCreateRoleLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateRoleLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateRole>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateRole>> {
		return {
			[DBEnv.FAKE]: FakeCreateRoleLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
