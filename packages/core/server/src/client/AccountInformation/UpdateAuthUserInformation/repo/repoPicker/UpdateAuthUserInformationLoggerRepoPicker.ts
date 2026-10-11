import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForUpdateAuthUserInformation} from '@copor/core/domain/User/logger/LogUpdateAuthUserInformation';
import {FakeUpdateAuthUserInformationLoggerRepo}
	from '../fake/FakeUpdateAuthUserInformationLoggerRepo';

export class UpdateAuthUserInformationLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateAuthUserInformation>> {
	protected getRepositoryList(): Record<
		string,
		new (appContext: AppContext) => LogRepository<LogDataForUpdateAuthUserInformation>
	> {
		return {
			[DBEnv.FAKE]: FakeUpdateAuthUserInformationLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
