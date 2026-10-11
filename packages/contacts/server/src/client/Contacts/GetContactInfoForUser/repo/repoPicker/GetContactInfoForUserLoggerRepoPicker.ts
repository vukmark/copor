import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForGetContactInfoForUser} from '@copor/contacts/domain/Contacts/logger/LogGetContactInfoForUser';
import {
	FakeGetContactInfoForUserLoggerRepo
} from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/fake/FakeGetContactInfoForUserLoggerRepo';

export class GetContactInfoForUserLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetContactInfoForUser>> {
	protected getRepositoryList(): Record<string, new(appContext: AppContext) => LogRepository<LogDataForGetContactInfoForUser>> {
		return {
			[DBEnv.FAKE]: FakeGetContactInfoForUserLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}