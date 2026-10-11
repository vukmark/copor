import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeDeletePhoneNumberLoggerRepo} from '../fake/FakeDeletePhoneNumberLoggerRepo';
import {
    KyselyDeletePhoneNumberLoggerRepo
} from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/kysely/KyselyDeletePhoneNumberLoggerRepo';
import {
    LogDataForDeletePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogDeletePhoneNumber';

export class DeletePhoneNumberLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeletePhoneNumber>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeletePhoneNumber>> {
		return {
			[DBEnv.FAKE]: FakeDeletePhoneNumberLoggerRepo,
			[DBEnv.KYSELY]: KyselyDeletePhoneNumberLoggerRepo
		};
	}
}