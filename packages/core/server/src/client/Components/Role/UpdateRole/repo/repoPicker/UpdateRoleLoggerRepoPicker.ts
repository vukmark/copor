import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateRole} from '@copor/core/domain/Components/Role/logger/LogUpdateRole';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeUpdateRoleLoggerRepo} from '../fake/FakeUpdateRoleLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateRoleLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateRole>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateRole>> {
		return {
			[DBEnv.FAKE]: FakeUpdateRoleLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
