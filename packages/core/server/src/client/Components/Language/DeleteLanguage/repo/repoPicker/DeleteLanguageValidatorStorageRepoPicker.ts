import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateDeleteLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteLanguageValidatorStorageRepo} from '../fake/FakeDeleteLanguageValidatorStorageRepo';
import {KyselyDeleteLanguageValidatorStorageRepo}
	from '@copor/core/client/Components/Language/DeleteLanguage/repo/kysely/KyselyDeleteLanguageValidatorStorageRepo';

export class DeleteLanguageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteLanguageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteLanguageValidatorStorageRepo
		};
	}
}