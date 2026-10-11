import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateUserProfileImageLoggerRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/fake/FakeUpdateUserProfileImageLoggerRepo';
import {
	KyselyUpdateUserProfileImageLoggerRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/kysely/KyselyUpdateUserProfileImageLoggerRepo';
import {LogDataForUpdateUserProfileImage} from '@copor/core/domain/User/logger/LogUpdateUserProfileImage';

export class UpdateUserProfileImageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateUserProfileImage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateUserProfileImage>> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserProfileImageLoggerRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserProfileImageLoggerRepo
		};
	}
}
