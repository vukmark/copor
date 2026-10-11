import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';
import {
	FakeToggleUserActiveStatusValidatorStorageRepo
} from '@copor/core/client/User/ToggleUserActiveStatus/repo/fake/FakeToggleUserActiveStatusValidatorStorageRepo';
import {
	KyselyToggleUserActiveStatusValidatorStorageRepo
} from '@copor/core/client/User/ToggleUserActiveStatus/repo/kysely/KyselyToggleUserActiveStatusValidatorStorageRepo';

export class ToggleUserActiveStatusValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserRepo> {
		return {
			[DBEnv.FAKE]: FakeToggleUserActiveStatusValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyToggleUserActiveStatusValidatorStorageRepo
		};
	}
}
