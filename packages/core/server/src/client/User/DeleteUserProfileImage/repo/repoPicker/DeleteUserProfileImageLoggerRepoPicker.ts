import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteUserProfileImageLoggerRepo
} from '@copor/core/client/User/DeleteUserProfileImage/repo/fake/FakeDeleteUserProfileImageLoggerRepo';
import {
	KyselyDeleteUserProfileImageLoggerRepo
} from '@copor/core/client/User/DeleteUserProfileImage/repo/kysely/KyselyDeleteUserProfileImageLoggerRepo';
import {LogDataForDeleteUserProfileImage} from '@copor/core/domain/User/logger/LogDeleteUserProfileImage';

export class DeleteUserProfileImageLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteUserProfileImage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteUserProfileImage>> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserProfileImageLoggerRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserProfileImageLoggerRepo
		};
	}
}
