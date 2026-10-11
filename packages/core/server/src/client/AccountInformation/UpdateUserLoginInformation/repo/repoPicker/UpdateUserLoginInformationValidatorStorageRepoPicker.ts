import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserLoginInformationRepo';
import {
	FakeUpdateUserLoginInformationValidatorStorageRepo
} from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/fake/FakeUpdateUserLoginInformationValidatorStorageRepo';
import {
	KyselyUpdateUserLoginInformationValidatorStorageRepo
} from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/kysely/KyselyUpdateUserLoginInformationValidatorStorageRepo';


export class UpdateUserLoginInformationValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserLoginInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserLoginInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserLoginInformationValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserLoginInformationValidatorStorageRepo
		};
	}
}
