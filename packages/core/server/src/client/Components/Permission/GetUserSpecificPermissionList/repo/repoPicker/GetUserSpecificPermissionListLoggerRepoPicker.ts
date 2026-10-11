import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeGetUserSpecificPermissionListLoggerRepo} from '../fake/FakeGetUserSpecificPermissionListLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetUserSpecificPermissionListLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetUserSpecificPermissionListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
