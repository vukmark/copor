import {NewRepositoryPicker} from '../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../Interface/AppContext';
import {DBEnv} from '../../../../enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForUpdateUserLoginInformation} from '@copor/core/domain/User/logger/LogUpdateUserLoginInformation';
import {
	FakeUpdateUserLoginInformationLoggerRepo
} from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/fake/FakeUpdateUserLoginInformationLoggerRepo';

export class UpdateUserLoginInformationLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateUserLoginInformation>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateUserLoginInformation>> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserLoginInformationLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
