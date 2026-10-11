import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeUpdatePhoneNumberLoggerRepo} from '../fake/FakeUpdatePhoneNumberLoggerRepo';
import {
	LogDataForUpdatePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogUpdatePhoneNumber';

export class UpdatePhoneNumberLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdatePhoneNumber[]>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdatePhoneNumber[]>> {
		return {
			[DBEnv.FAKE]: FakeUpdatePhoneNumberLoggerRepo,
			[DBEnv.KYSELY]: FakeUpdatePhoneNumberLoggerRepo
		};
	}
}
