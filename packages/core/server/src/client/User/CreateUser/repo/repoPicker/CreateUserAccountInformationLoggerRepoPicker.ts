import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForCreateUserAccountInformation} from '@copor/core/domain/User/AccountInformation/logger/LogCreateUserAccountInformation';
import {FakeCreateUserAccountInformationLoggerRepo} from '../fake/FakeCreateUserAccountInformationLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateUserAccountInformationLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateUserAccountInformation>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateUserAccountInformation>> {
		return {
			[DBEnv.FAKE]: FakeCreateUserAccountInformationLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
