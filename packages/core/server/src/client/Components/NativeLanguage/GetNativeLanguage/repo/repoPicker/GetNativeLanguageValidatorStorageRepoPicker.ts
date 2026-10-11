import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {IsInvalidNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/IsInvalidNativeLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNativeLanguageValidatorStorageRepo} from '../fake/FakeGetNativeLanguageValidatorStorageRepo';
import {KyselyGetNativeLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/NativeLanguage/GetNativeLanguage/repo/kysely/KyselyGetNativeLanguageValidatorStorageRepo';
import {ValidateGetNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateGetNativeLanguageRepo';

export class GetNativeLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetNativeLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidNativeLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeGetNativeLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetNativeLanguageValidatorStorageRepo
		};
	}
}
