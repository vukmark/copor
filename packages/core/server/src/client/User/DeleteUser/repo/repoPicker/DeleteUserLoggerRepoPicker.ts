import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForDeleteUser} from '@copor/core/domain/User/logger/LogDeleteUser';
import {FakeDeleteUserLoggerRepo} from '@copor/core/client/User/DeleteUser/repo/fake/FakeDeleteUserLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteUserLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteUser>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteUser>> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
