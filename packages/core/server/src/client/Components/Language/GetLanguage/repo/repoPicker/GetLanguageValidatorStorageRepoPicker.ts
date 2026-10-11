import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {IsInvalidLanguageRepo} from '@copor/core/domain/Components/Language/repository/IsInvalidLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLanguageValidatorStorageRepo} from '../fake/FakeGetLanguageValidatorStorageRepo';
import {KyselyGetLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/Language/GetLanguage/repo/kysely/KyselyGetLanguageValidatorStorageRepo';
import {ValidateGetLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateGetLanguageRepo';

export class GetLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeGetLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetLanguageValidatorStorageRepo
		};
	}
}
