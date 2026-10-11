import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeCreatePhoneNumberLoggerRepo} from '../fake/FakeCreatePhoneNumberLoggerRepo';
import {LogDataForCreatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';

export class CreatePhoneNumberLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreatePhoneNumber[]>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreatePhoneNumber[]>> {
		return {
			[DBEnv.FAKE]: FakeCreatePhoneNumberLoggerRepo,
			[DBEnv.KYSELY]: FakeCreatePhoneNumberLoggerRepo
		};
	}
}
