import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {
	ValidateGetUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateGetUserAccountInformationRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetUserAccountInformationForDisplayValidatorStorageRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/fake/FakeGetUserAccountInformationForDisplayValidatorStorageRepo';
import {
	KyselyGetUserAccountInformationForDisplayValidatorStorageRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/kysely/KyselyGetUserAccountInformationForDisplayValidatorStorageRepo';

export class GetUserAccountInformationValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsNotValidUserRepo> {
		return {
			[DBEnv.KYSELY]: FakeGetUserAccountInformationForDisplayValidatorStorageRepo,
			[DBEnv.FAKE]: KyselyGetUserAccountInformationForDisplayValidatorStorageRepo
		};
	}
}