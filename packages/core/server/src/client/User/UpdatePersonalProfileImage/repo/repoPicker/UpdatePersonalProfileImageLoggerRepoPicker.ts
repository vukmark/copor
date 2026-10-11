import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdatePersonalProfileImageLoggerRepo} from '../fake/FakeUpdatePersonalProfileImageLoggerRepo';
import {LogDataForUpdatePersonalProfileImage} from '@copor/core/domain/User/logger/LogUpdatePersonalProfileImage';

export class UpdatePersonalProfileImageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdatePersonalProfileImage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdatePersonalProfileImage>> {
		return {
			[DBEnv.FAKE]: FakeUpdatePersonalProfileImageLoggerRepo,
			[DBEnv.KYSELY]: FakeUpdatePersonalProfileImageLoggerRepo
		};
	}
}
