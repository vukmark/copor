import {NewRepositoryPicker} from '../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../Interface/AppContext';
import {DBEnv} from '../../../../enum/DBEnv';
import {FakeUpdateUserAccountInformationLoggerRepo} from '../fake/FakeUpdateUserAccountInformationLoggerRepo';
import {LogDataForUpdateUserAccountInformation}
	from '@copor/core/domain/User/logger/LogUpdateUserAccountInformation';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateUserAccountInformationLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateUserAccountInformation>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateUserAccountInformation>> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserAccountInformationLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
