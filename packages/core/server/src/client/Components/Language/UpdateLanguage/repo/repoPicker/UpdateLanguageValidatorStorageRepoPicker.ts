import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateUpdateLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateLanguageValidatorStorageRepo} from '../fake/FakeUpdateLanguageValidatorStorageRepo';
import {KyselyUpdateLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/Language/UpdateLanguage/repo/kysely/KyselyUpdateLanguageValidatorStorageRepo';

export class UpdateLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateLanguageValidatorStorageRepo
		};
	}
}
