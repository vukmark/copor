import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserContactInformationLoggerRepo} from '../fake/FakeGetUserContactInformationLoggerRepo';
import {LogDataForGetUserContactInformation}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/logger/LogGetUserContactInformation';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetUserContactInformationLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetUserContactInformation>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetUserContactInformation>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetUserContactInformationLoggerRepo
		};
	}
}
