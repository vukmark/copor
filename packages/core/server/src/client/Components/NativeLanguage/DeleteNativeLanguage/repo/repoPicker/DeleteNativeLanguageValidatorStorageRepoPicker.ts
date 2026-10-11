import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateDeleteNativeLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNativeLanguageValidatorStorageRepo} from '../fake/FakeDeleteNativeLanguageValidatorStorageRepo';
import {KyselyDeleteNativeLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/NativeLanguage/DeleteNativeLanguage/repo/kysely/KyselyDeleteNativeLanguageValidatorStorageRepo';

export class DeleteNativeLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteNativeLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteNativeLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteNativeLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteNativeLanguageValidatorStorageRepo
		};
	}
}