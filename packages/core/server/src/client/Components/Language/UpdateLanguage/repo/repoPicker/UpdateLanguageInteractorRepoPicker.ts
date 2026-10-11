import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveLanguageRepo} from '@copor/core/domain/Components/Language/repository/SaveLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateLanguageInteractorRepo} from '../fake/FakeUpdateLanguageInteractorRepo';
import {
	KyselyUpdateLanguageInteractorRepo
} from '@copor/core/client/Components/Language/UpdateLanguage/repo/kysely/KyselyUpdateLanguageInteractorRepo';

export class UpdateLanguageInteractorRepoPicker extends NewRepositoryPicker<SaveLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateLanguageInteractorRepo
		};
	}
}
