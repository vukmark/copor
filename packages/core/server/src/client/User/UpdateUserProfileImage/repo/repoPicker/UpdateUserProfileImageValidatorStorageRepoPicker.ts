import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';
import {
	FakeUpdateUserProfileImageValidatorStorageRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/fake/FakeUpdateUserProfileImageValidatorStorageRepo';
import {
	KyselyUpdateUserProfileImageValidatorStorageRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/kysely/KyselyUpdateUserProfileImageValidatorStorageRepo';

export class UpdateUserProfileImageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserProfileImageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserProfileImageValidatorStorageRepo
		};
	}
}
