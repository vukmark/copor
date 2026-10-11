import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRole} from '@copor/core/domain/Components/Role/logger/LogDeleteRole';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeDeleteRoleLoggerRepo} from '../fake/FakeDeleteRoleLoggerRepo';
import {KyselyDeleteRoleLoggerRepo} from '@copor/core/client/Components/Role/DeleteRole/repo/kysely/KyselyDeleteRoleLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteRoleLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteRole>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteRole>> {
		return {
			[DBEnv.FAKE]: FakeDeleteRoleLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}