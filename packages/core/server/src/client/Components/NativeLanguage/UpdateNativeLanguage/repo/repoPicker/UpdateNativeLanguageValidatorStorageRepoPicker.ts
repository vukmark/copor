import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateUpdateNativeLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNativeLanguageValidatorStorageRepo} from '../fake/FakeUpdateNativeLanguageValidatorStorageRepo';
import {KyselyUpdateNativeLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/NativeLanguage/UpdateNativeLanguage/repo/kysely/KyselyUpdateNativeLanguageValidatorStorageRepo';

export class UpdateNativeLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateNativeLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateNativeLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateNativeLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateNativeLanguageValidatorStorageRepo
		};
	}
}
